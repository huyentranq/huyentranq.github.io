import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'TMDB Movie Recommendation Pipeline',
      type: 'Data Engineering / Lakehouse',
      description:
        'An end-to-end lakehouse pipeline that ingests TMDB/Kaggle movie data, processes it with Spark, models analytics-ready tables with dbt, and serves recommendation outputs through downstream applications.',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
      highlights: ['1M+ records', 'Bronze/Silver/Gold', 'dbt warehouse models'],
      tech: ['Python', 'PySpark', 'ELT', 'dbt', 'Dagster'],
      github: 'https://github.com/huyentranq/TMDB-Pipeline-Recommendation',
      slug: 'movie-recommendation-system',
    },
    {
      title: 'Streaming Data Pipeline',
      type: 'Streaming / Analytics',
      description:
        'A real-time pizza sales pipeline using Kafka, Spark Streaming, MinIO, PostgreSQL, Airflow, and Power BI to move raw events into analytics-ready medallion layers.',
      image: '/projects/Streaming/images/pages.png',
      highlights: ['Kafka events', 'Spark Streaming', 'Power BI reporting'],
      tech: ['Kafka', 'Spark', 'Python', 'Power BI', 'Airflow'],
      github: 'https://github.com/huyentranq/Streaming-Data-pipeline',
      slug: 'streaming-data-pipeline',
    },
    {
      title: 'Sketch-to-Image Face Synthesis',
      type: 'Deep Learning / Conditional GAN',
      description:
        'A final deep learning project using Pix2Pix and transfer learning to translate face sketches into photo-like portraits, with paired-data preprocessing, ablation studies, quantitative evaluation, and Gradio deployment.',
      image: '/projects/SketchToImage/images/test_app.png',
      highlights: ['FID 71.65', 'Identity Cosine 0.8455', '564 aligned samples'],
      tech: ['PyTorch', 'Pix2Pix', 'U-Net', 'PatchGAN', 'OpenCV', 'Gradio'],
      github: 'https://github.com/huyentranq/Sketch-to-Image-by-Pix2Pix',
      slug: 'sketch-to-image-pix2pix',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.45 },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-[#0b0f12] px-5 py-10 text-white sm:px-8 lg:px-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        <motion.div variants={itemVariants} className="max-w-3xl space-y-3">
          <p className="text-[10px] text-[#83727b]">
            <span className="text-[#ff4fa3]">huyen@portfolio</span> : ~/projects $ ls --selected
          </p>
          <h1 className="pt-4 text-3xl font-bold text-white">
            <span className="mr-3 text-[#ff4fa3]">#</span>Selected Projects
          </h1>
          <p className="max-w-2xl text-[12px] leading-6 text-[#9b8e95]">
            // Data engineering, machine learning, and streaming systems built with an emphasis on architecture, reproducibility, and measurable outcomes.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="group relative flex h-full flex-col overflow-hidden border border-[#3d2933] bg-[#0e1114] transition hover:-translate-y-0.5 hover:border-[#ff4fa3]/70 hover:shadow-[8px_8px_0_#2a1020]"
            >
              <Link
                to={`/projects/${project.slug}`}
                className="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ff4fa3]"
                aria-label={`Read case study: ${project.title}`}
              />
              <div className="relative h-40 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover grayscale-[35%] transition duration-300 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-[#ff4fa3]/5 mix-blend-color" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="text-[10px] font-bold uppercase text-[#ff67b0]">
                  {project.type}
                </p>
                <h2 className="mt-2 text-lg font-bold text-white transition group-hover:text-[#ff7fbd]">
                  {project.title}
                </h2>
                <p className="mt-3 text-[12px] leading-6 text-[#aa9da4]">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.highlights.map((highlight) => (
                    <span key={highlight} className="text-[10px] font-bold text-[#c86a98]">
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="border border-[#3f2c35] px-2 py-1 text-[10px] text-[#93848b]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                  <span className="inline-flex items-center text-[11px] font-bold text-[#ff67b0] transition group-hover:text-[#ffa3d0]">
                    Read case study
                    <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                  <a
                    href={project.github}
                    className="relative z-20 border border-[#3f2c35] p-2 text-[#8e7e86] transition hover:border-[#ff4fa3] hover:text-[#ff7fbd]"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} GitHub repository`}
                  >
                    <Github size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
