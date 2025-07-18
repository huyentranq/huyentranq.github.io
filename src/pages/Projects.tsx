import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Movie Recommendation System',
      description:
        'An Data pipeline serving for Movie recommendation system based on user behavior',
      image:
        'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Python', 'PySpark', 'ELT', 'DBT', 'Dagster'],
      github: 'https://github.com/huyentranq/TMDB-Pipeline-Recommendation',
      slug: 'movie-recommendation-system',
    },
    {
      title: 'Streaming Data pipeline',
      description:
        'A Streaming pipeline showcase real-time data processing by sales pizza dataset',
      image:
        '/projects/Streaming/images/pages.png',
      tech: ['Kafka', 'Spark', 'Python', 'PowerBI','Streaming'],
      github: 'https://github.com/huyentranq/Streaming-Data-pipeline',
      slug: 'streaming-data-pipeline',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="py-12 px-4 space-y-8 bg-gradient-to-br from-pink-50 via-fuchsia-100 to-white dark:from-gray-900 dark:to-gray-800"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Heading */}
      <motion.div variants={itemVariants} className="text-center space-y-3">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
          ✨ My Projects
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A collection of projects I’ve built with 💖, showcasing data engineering, analytical insights and a bit of creative front-end.
        </p>
      </motion.div>

      {/* Project Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            className="bg-white/70 dark:bg-[#1e1b4b] rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -3 }}
          >
            <div className="h-48 relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-3 right-3 flex space-x-2">
                {project.github && (
                  <a
                    href={project.github}
                    className="p-2 bg-pink-600/90 rounded-full text-white hover:bg-pink-500 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    className="p-2 bg-purple-500/90 rounded-full text-white hover:bg-purple-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

            <div className="p-5 flex flex-col justify-between">
              <Link to={`/projects/${project.slug}`}>
                <h3 className="text-xl font-semibold mb-2 text-purple-700 dark:text-pink-300 group-hover:text-pink-500 transition-colors">
                  {project.title}
                </h3>
              </Link>

              <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-pink-100 dark:bg-pink-700 text-pink-800 dark:text-white rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center text-pink-600 dark:text-pink-300 font-medium hover:text-pink-800 dark:hover:text-pink-200 transition-colors text-sm"
              >
                Read More
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.div>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Projects;
