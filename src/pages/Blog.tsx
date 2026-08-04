import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Database, RadioTower } from 'lucide-react';

const posts = [
  {
    title: 'Notes on Building a Lakehouse Movie Pipeline',
    description:
      'How I structured ingestion, Spark transformation, dbt modeling, and serving layers in the TMDB project.',
    tag: 'Data Engineering',
    href: '/projects/movie-recommendation-system',
    icon: Database,
  },
  {
    title: 'From Sketches to Faces with Pix2Pix',
    description:
      'A concise write-up of the final deep learning project: data preparation, cGAN training, ablation, and evaluation.',
    tag: 'Deep Learning',
    href: '/projects/sketch-to-image-pix2pix',
    icon: BookOpen,
  },
  {
    title: 'Streaming Pipeline Design Notes',
    description:
      'Practical notes on Kafka, Spark Streaming, medallion layers, and dashboard-ready outputs.',
    tag: 'Streaming',
    href: '/projects/streaming-data-pipeline',
    icon: RadioTower,
  },
];

const Blog = () => {
  return (
    <motion.div
      className="min-h-screen bg-[#0b0f12] px-5 py-10 text-white sm:px-8 lg:px-12"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-3">
          <p className="text-[10px] text-[#83727b]">
            <span className="text-[#ff4fa3]">huyen@portfolio</span> : ~/blog $ list --notes
          </p>
          <h1 className="pt-4 text-3xl font-bold text-white">
            <span className="mr-3 text-[#ff4fa3]">#</span>Technical notes and project write-ups
          </h1>
          <p className="max-w-2xl text-[12px] leading-6 text-[#9b8e95]">
            // Practical notes from data engineering, data science, and applied machine learning projects.
          </p>
        </div>

        <div className="grid gap-4">
          {posts.map(({ title, description, tag, href, icon: Icon }) => (
            <Link
              key={title}
              to={href}
              className="group border-l border-[#4a2d3b] py-5 pl-5 transition hover:border-[#ff4fa3] hover:bg-[#110c10]"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-[#4a2d3b] text-[#ff67b0]">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase text-[#c76b98]">
                    {tag}
                  </p>
                  <h2 className="mt-1.5 text-lg font-bold text-white group-hover:text-[#ff7fbd]">
                    {title}
                  </h2>
                  <p className="mt-2 text-[12px] leading-6 text-[#9b8e95]">
                    {description}
                  </p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#65515b] transition group-hover:translate-x-1 group-hover:text-[#ff4fa3]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;
