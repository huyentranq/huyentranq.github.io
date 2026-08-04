# Sketch-to-Image Face Synthesis with Pix2Pix

This project was developed as the final project for **Deep Learning for Data Science** at HCMUS. The goal was to study the Sketch-to-Image problem as an image-to-image translation task and build a model that can convert a hand-drawn face sketch into a photo-like portrait.

The project does not treat Pix2Pix as a black-box demo. It includes data exploration, preprocessing, paired-data construction, augmentation, multiple model variants, ablation experiments, quantitative evaluation, qualitative comparison, and a Gradio web demo for inference.

![Sketch-to-Image demo](/projects/SketchToImage/images/test_app.png)

## 1. Project Goal

Sketch-to-Image is difficult because the input sketch contains only sparse contour information. The model must infer missing visual attributes such as skin tone, lighting, texture, hair detail, and local facial features while still preserving the face structure from the sketch.

The final project focused on:

- Studying GAN, Conditional GAN, Pix2Pix, and image-to-image translation theory.
- Building a data pipeline for sketch-photo paired training data.
- Training Pix2Pix models to translate sketches into face photos.
- Comparing a custom U-Net baseline, standard Pix2Pix, and transfer-learning Pix2Pix.
- Measuring output quality with both quantitative metrics and visual inspection.
- Packaging a trained model into a simple web demo.

## 2. Dataset

The report studied several sketch-to-image domains conceptually, including Facades, Edges2Shoes, and CUFS. The final face synthesis experiments focused on **CUHK Face Sketch Database (CUFS)**.

CUFS contains **606 sketch-photo pairs** from three sources:

| Source | Pairs | Notes |
|---|---:|---|
| CUHK Student Database | 188 | Asian students, normalized lighting, neutral expression |
| AR Face Database | 123 | Multi-ethnic faces, normalized lighting |
| XM2VTS Database | 295 | Diverse age and gender, frontal pose |

For this project, the implementation narrowed the scope to the **CUHK Student Database subset** with **188 paired samples**. Each photo has a corresponding professional hand-drawn sketch, giving a one-to-one relationship between input and target.

The data was organized into Pix2Pix aligned-pair format:

- **A:** sketch image
- **B:** photo image
- **Combined training image:** sketch and photo concatenated horizontally as `A|B`
- **Final aligned size:** `512 x 256`
- **Model input/output size:** `256 x 256`

![Aligned sketch-photo pairs](/projects/SketchToImage/images/grid_pairs.png)

## 3. Data Split

CUFS does not provide an official train/test split, so the project created a reproducible split with `seed = 42`.

| Split | Original Pairs | After Augmentation | Ratio |
|---|---:|---:|---:|
| Train | 150 | 450 | 80% |
| Test | 38 | 114 | 20% |
| Total | 188 | 564 | 100% |

The augmentation multiplier was 3x. Each original pair produced:

- `aug0`: original version
- `aug1`: random transformed version
- `aug2`: another random transformed version

## 4. Data Pipeline

The report designed the data pipeline as an offline preparation stage before model training. This made the training runs faster and easier to reproduce on Kaggle.

The pipeline is automated through `run_pipeline.py` and is composed of three core scripts:

| Script | Responsibility |
|---|---|
| `preprocess.py` | Processes photo and sketch streams, resizes images, enhances edges, and records data errors |
| `augmentation.py` | Generates augmented paired data with domain-specific transformations |
| `match_sketch_image.py` | Matches sketch-photo pairs, combines them into A|B images, shuffles by original image unit, and creates train/test folders |

The final output follows the Pix2Pix dataset layout:

```text
pipeline_output/
  output/
    train/  # 450 aligned 512x256 images
    test/   # 114 aligned 512x256 images
```

## 5. Preprocessing

The preprocessing work focused on keeping the paired relationship clean and reducing spatial noise before training:

- Matched photo and sketch filenames despite inconsistent naming.
- Processed sketch and photo folders as two aligned streams.
- Resized images into a consistent square format.
- Preserved face structure and avoided distortion during resizing.
- Converted separate sketch/photo images into the Pix2Pix `A|B` paired format.
- Normalized image tensors into the range expected by the generator.

The report also analyzed bounding-box behavior to verify that face regions occupied most of the image area and that useless background information was limited.

![Bounding box analysis](/projects/SketchToImage/images/bbox_scatter.png)

## 6. Augmentation Strategy

Because the CUHK subset has only 188 pairs, the project used offline augmentation to reduce overfitting risk. The important design rule was that geometry-changing transforms must be applied synchronously to both sketch and photo so the pair remains aligned.

### 6.1 Synchronized Pair Augmentation

These transforms were applied to both sketch and photo with the same parameters:

- **Horizontal flip** with probability `p = 0.5`
- **Random rotation** within `[-15°, +15°]`

### 6.2 Photo-Only Augmentation

These transforms were applied only to the target photo:

- **Gaussian blur** with sigma in `[0.1, 1.5]`
- **Gaussian noise** with standard deviation in `[1, 10]`
- **Color jitter** for brightness, contrast, and saturation within `±10%`

The sketch was kept clean because adding color/noise to a binary line drawing would damage the sketch domain and make learning less stable.

![Augmentation examples](/projects/SketchToImage/images/augmentation_demo.png)

## 7. Model Architecture

The project compared three major modeling directions.

### 7.1 Custom U-Net Baseline

The first model was a hand-implemented U-Net style generator. It served as a baseline to understand the forward pass, skip connections, reconstruction behavior, and the sensitivity of image generation to implementation details.

This model could learn the global face layout but produced blurrier and less detailed results than Pix2Pix-based models.

### 7.2 Standard Pix2Pix with U-Net 256

The second model used the standard Pix2Pix setup from the `pytorch-CycleGAN-and-pix2pix` framework:

- `Generator`: `unet_256`, an 8-layer U-Net generator for `256 x 256` inputs.
- `Discriminator`: `basic`, equivalent to a `70 x 70` PatchGAN.
- `Objective`: conditional adversarial loss + L1 reconstruction loss.
- `lambda_L1`: `100`.

The U-Net generator uses encoder-decoder blocks and skip connections to preserve spatial structure from the sketch. PatchGAN evaluates realism at the local-patch level, which helps improve texture and edge sharpness.

### 7.3 Pix2Pix Transfer Learning

The third direction replaced the generator with a transfer-learning architecture. The report discusses pretrained visual backbones such as ResNet18 and VGG19-style transfer learning. The main idea was to reuse visual features learned from large-scale image data instead of forcing the model to learn all low-level features from a small CUFS subset.

The transfer-learning generator was trained in a two-phase strategy:

- **Phase 1:** freeze the pretrained encoder and train the decoder plus discriminator.
- **Phase 2:** unfreeze the encoder and fine-tune the full generator with a smaller learning rate.

This approach improved perceptual quality and distribution-level metrics, especially in low-data settings.

## 8. Training Setup

Experiments were run in Kaggle Notebook with:

- **Python:** 3.12.12
- **Framework:** PyTorch
- **GPU:** dual NVIDIA Tesla T4
- **Logging:** Weights & Biases
- **Approximate full training time:** around 30 minutes per configuration in the reported setup

Baseline hyperparameters:

| Hyperparameter | Value | Notes |
|---|---:|---|
| `batch_size` | 4 | Suitable for Kaggle T4 memory |
| `learning_rate` | `2e-4` | Adam optimizer |
| `beta1` | 0.5 | More stable for GAN training than default 0.9 |
| `n_epochs` | 100 | Constant LR phase |
| `n_epochs_decay` | 100 | Linear LR decay phase |
| `lambda_L1` | 100 | Reconstruction loss weight |
| `load_size / crop_size` | `286 / 256` | Resize and crop in training |
| `netG` | `unet_256` | 8-level U-Net generator |
| `netD` | `basic` | 70 x 70 PatchGAN |

## 9. Training Flow

The Pix2Pix training loop follows the conditional GAN setup:

1. `set_input()` loads `real_A` as sketch and `real_B` as ground-truth photo.
2. `forward()` generates `fake_B = G(real_A)`.
3. `backward_D()` trains the discriminator on:
   - fake pair: `(real_A, fake_B)`
   - real pair: `(real_A, real_B)`
4. `backward_G()` trains the generator with:
   - GAN loss to fool the discriminator
   - L1 reconstruction loss against the real photo
5. `optimize_parameters()` updates discriminator first, then generator.

The model uses a linear learning-rate scheduler: keep LR fixed for the first phase, then decay linearly toward zero for stable convergence.

## 10. Experiment Design

The ablation study examined:

- Raw dataset vs augmented dataset
- Batch sizes: `16`, `8`, `4`
- Learning rates: `1e-4`, `2e-4`
- Custom U-Net vs Pix2Pix U-Net 256 vs Pix2Pix transfer learning
- PatchGAN/Pixel-discriminator variants in the architecture study

The goal was not just to find one visually good model, but to understand trade-offs between:

- pixel reconstruction
- structure preservation
- perceptual realism
- distribution similarity
- identity preservation

## 11. Evaluation Metrics

The project used multiple metric families because face synthesis cannot be judged well by a single score.

| Metric Group | Metrics | Meaning |
|---|---|---|
| Pixel error | MAE/L1, RMSE | Pixel-level reconstruction difference |
| Signal quality | PSNR | Noise/reconstruction quality |
| Structure | SSIM, MS-SSIM | Shape and structural similarity |
| Perceptual quality | LPIPS | Human-perception aligned difference |
| Distribution | FID, KID mean/std | Distance between generated and real image distributions |
| Identity | Identity Cosine | Face-embedding similarity between generated and target photo |

## 12. Quantitative Results

### 12.1 Raw Dataset

On the original CUFS split, **Pix2Pix transfer learning with batch size 4 and learning rate `2e-4`** was the strongest configuration for perceptual quality, distribution similarity, and identity preservation.

Key results:

- **MAE:** 0.0674
- **PSNR:** 17.0827
- **LPIPS:** 0.1917
- **FID:** 97.3105
- **KID mean:** 0.0408
- **Identity Cosine:** 0.8455

The report also found that standard Pix2Pix with U-Net 256 was stronger for structure-focused metrics:

- **Best PSNR:** 17.3248 at batch size 8
- **Best SSIM:** 0.7381 at batch size 8
- **Best MS-SSIM:** 0.8276 at batch size 16

This revealed an important trade-off:

- **Standard Pix2Pix** preserved local structure and geometric similarity better.
- **Transfer learning Pix2Pix** produced more natural-looking outputs and better distribution/identity metrics.

### 12.2 Augmented Dataset

On the augmented dataset, transfer learning benefited strongly in distribution and perceptual metrics.

Best transfer-learning configuration with batch size 4 and learning rate `2e-4`:

- **PSNR:** 18.0477
- **MS-SSIM:** 0.8169
- **LPIPS:** 0.1936
- **FID:** 71.6462
- **KID mean:** 0.0401

Compared with the raw-data transfer-learning result, augmentation improved FID from **97.3105** to **71.6462** and PSNR from **17.0827** to **18.0477**.

However, augmentation did not improve every objective. Identity Cosine dropped from **0.8455** on raw data to **0.7702** in the augmented transfer-learning setting. Meanwhile, standard Pix2Pix on augmented data achieved stronger identity preservation:

- **Pix2Pix U-Net 256 Identity Cosine:** 0.8354 at batch size 4
- **Pix2Pix U-Net 256 MAE:** 0.0664 at batch size 16

The conclusion was that augmentation is not universally better. It improves some quality and distribution metrics, but may reduce identity preservation depending on architecture and objective.

## 13. Qualitative Findings

The visual comparison confirmed the metric trends:

- The custom U-Net baseline learned rough face layout, but outputs were blurry and lacked local detail.
- Standard Pix2Pix generated clearer face structure, with more stable eyes, nose, mouth, and hair regions.
- Pix2Pix transfer learning produced the most natural-looking portraits, with sharper facial boundaries and better texture realism.

Across multiple test samples, the model preserved the main facial layout from sketches and generated plausible photo-like outputs. Remaining weaknesses appeared around small details such as eyes, mouth boundaries, hair edges, and subtle identity cues.

## 14. Gradio Demo

The project also includes a lightweight Gradio app to demonstrate model inference.

![Gradio app interface](/projects/SketchToImage/images/app_interface.png)

The demo flow:

1. Upload a face sketch.
2. Resize and normalize the image into the model input format.
3. Run the trained PyTorch checkpoint.
4. Display the generated portrait in the browser.

The demo is useful for presentation and manual testing, but the report notes that final model quality should still be judged through formal test-set metrics and qualitative analysis. Output quality depends heavily on the input sketch quality: clear, centered sketches produce more stable results than noisy or off-distribution sketches.

## 15. Limitations

The final report identified several limitations:

- The training data is small relative to the complexity of face generation.
- The project mainly studies U-Net/Pix2Pix-based methods and does not yet compare with modern Diffusion or Transformer-based generators.
- There is still a trade-off between structure metrics such as SSIM/MS-SSIM and perceptual/distribution metrics such as LPIPS/FID/KID.
- Some generated faces still lose fine-grained identity details.
- Augmentation effects are not uniformly positive across all models and metrics.

## 16. Future Work

Potential next steps:

- Expand the dataset to include more diverse faces, poses, expressions, and lighting conditions.
- Study augmentation strategies specifically designed for sketch-to-photo translation.
- Compare Pix2Pix against Diffusion Models, Latent Diffusion Models, and Transformer-based generation methods.
- Add attention modules or Transformer blocks into the generator.
- Introduce identity-preserving losses using FaceNet, ArcFace, or similar face-recognition embeddings.
- Optimize a multi-objective training strategy that balances structure preservation, perceptual realism, and identity consistency.
- Improve the demo into a real-time sketch-to-photo application.

## 17. Project Takeaway

The project demonstrates that Conditional GANs are a feasible approach for face sketch-to-photo synthesis. Standard Pix2Pix is reliable for preserving geometric structure, while transfer-learning Pix2Pix is the strongest direction for perceptual quality and distribution realism. The most valuable engineering lesson was that model performance depends not only on architecture, but also on paired-data quality, preprocessing consistency, augmentation strategy, and evaluation design.
