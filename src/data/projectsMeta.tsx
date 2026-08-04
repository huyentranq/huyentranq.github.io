interface ProjectMeta {
  title: string;
  githubUrl?: string;
  description?: string;
  stars?: number;
  forks?: number;
  tech?: string;
}

const projectsMeta: Record<string, ProjectMeta> = {
  "sketch-to-image-pix2pix": {
    title: "Sketch-to-Image Face Synthesis",
    githubUrl: "https://github.com/huyentranq/Sketch-to-Image-by-Pix2Pix",
    description:
      "Conditional GAN / Pix2Pix project for translating face sketches into photo-realistic portraits, including preprocessing, ablation, evaluation, and Gradio deployment.",
    tech: "PyTorch    Pix2Pix    U-Net    PatchGAN    OpenCV    Gradio",
  },
  "movie-recommendation-system": {
    title: "Movie Recommendation System",
    githubUrl: "https://github.com/huyentranq/TMDB-Pipeline-Recommendation",
    description:
      "ELT Pipeline for Movie Recommendation System",
    stars: 2,

    tech: "Spark    Dagster     DBT ",
  },
  "streaming-data-pipeline":{
    title: "Streaming-Data-pipeline",
    githubUrl: "https://github.com/huyentranq/Streaming-Data-pipeline",
    description:"A Streaming pipeline showcase real-time data processing by sales pizza dataset",
    // stars: 2,
    tech: "Kafka    Spark     Python",
  }
};

export default projectsMeta;
