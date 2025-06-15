import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Movie Recommendation System',
      description: 'An AI-powered movie recommendation system using collaborative filtering and content-based filtering techniques. Built with Python, Streamlit, and PostgreSQL.',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Python', 'Streamlit', 'PostgreSQL', 'Scikit-learn'],
      github: 'https://github.com/yourusername/movie-recommendation',
      demo: 'https://movie-rec-demo.streamlit.app',
      slug: 'movie-recommendation-system'
    },
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with user authentication, product management, shopping cart, and payment integration.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
      github: 'https://github.com/yourusername/ecommerce-platform',
      demo: 'https://ecommerce-demo.vercel.app',
      slug: 'ecommerce-platform'
    },
    {
      title: 'Real-time Chat Application',
      description: 'A scalable real-time chat application with WebSocket integration, user authentication, and message history.',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Vue.js', 'Socket.io', 'Redis', 'Express.js'],
      github: 'https://github.com/yourusername/chat-app',
      demo: 'https://chat-app-demo.netlify.app',
      slug: 'chat-application'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className="py-12 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="text-center space-y-3">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Projects
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A collection of projects I've worked on, showcasing different technologies and problem-solving approaches.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-750 transition-all duration-300 group"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -3 }}
          >
            <div className="md:flex">
              <div className="md:w-1/2 relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 right-3 flex space-x-2">
                  <a
                    href={project.github}
                    className="p-2 bg-gray-900/80 rounded-full text-white hover:bg-gray-800 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={project.demo}
                    className="p-2 bg-gray-900/80 rounded-full text-white hover:bg-gray-800 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
              
              <div className="md:w-1/2 p-6 flex flex-col justify-center">
                <Link to={`/projects/${project.slug}`}>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors group text-sm"
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
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Projects;