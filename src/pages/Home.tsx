import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

import {
  ArrowRight,
  Award,
  Trophy,
  GraduationCap,
  Code,
  Database
} from 'lucide-react';

const Home = () => {
  const competitions = [
    { title: 'SCUDEM IX (International Challenge on Differential Equations Modeling)', rank: '2nd Place' },
    { title: 'MCM/ICM 2025 (International Mathematical Contest in Modeling)', rank: 'Honorable Award' },
    { title: 'MDS Datathon Challenge in Business', rank: 'Top 20' },
  ];

  const certificates = [
    { title: 'Advanced SQL Certificate - Hackerank', issuer: 'Amazon Web Services' },
    { title: 'Fundamental Data Engineer', issuer: 'Google Cloud' },
  ];


 const contactLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/huyentranq',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/trang-nguyen-huyen-674109249/',
    icon: 'linkedin',
  },
  {
    name: 'Gmail',
    url: 'nguyenhuyentrangg457@gmail.com',
    icon: 'mail',
  },
];

  const projects = [
    {
      title: 'Movie Recommendation System',
      description: 'AI-powered recommendation engine using collaborative filtering',
      tech: ['Python', 'TensorFlow', 'PostgreSQL'],
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600',
      slug: 'movie-recommendation-system'
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with real-time features',
      tech: ['React', 'Node.js', 'MongoDB'],
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
      slug: 'ecommerce-platform'
    },
    {
      title: 'Real-time Chat Application',
      description: 'Scalable chat app with WebSocket integration',
      tech: ['Vue.js', 'Socket.io', 'Redis'],
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600',
      slug: 'chat-application'
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 }
    })
  };

  return (
    <motion.div initial="hidden" animate="visible" className="py-12 space-y-16">
      
      {/* ✅ ADDED: Avatar Image */}
      <motion.div className="flex justify-center">
        <img
          src="https://i.pravatar.cc/150?img=68"
          alt="Profile"
          className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-md"
        />
      </motion.div>

      {/* Hero */}
      <motion.section custom={1} variants={fadeIn} className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Huyen Trang
        </h1>

        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mt-6">
          Passionate Data Engineer with a knack for building scalable data solutions and a love for solving complex problems.
        </p>
      </motion.section>
    {/* Education & Skills */}
    <motion.section custom={2} variants={fadeIn} className="grid lg:grid-cols-2 gap-12">
      {/* Left: Skills */}
      <div className="space-y-8">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Code className="mr-2 w-5 h-5 text-green-500" /> Core Technologies
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-medium mb-1">Languages</p>
              <div className="flex flex-wrap gap-1">
                {['Python',  'SQL','R','C++'].map((lang) => (
                  <span key={lang} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">{lang}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-medium mb-1">Data Tools</p>
              <div className="flex flex-wrap gap-1">
                {['Spark', 'Dagster','DBT'].map((tool) => (
                  <span key={tool} className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">{tool}</span>
                ))}
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold flex items-center mt-4">
            <Database className="mr-2 w-5 h-5 text-purple-500" /> Cloud & Infrastructure
          </h3>
          <div className="flex flex-wrap gap-1 text-sm">
            {['Databricks', 'Docker','Minio'].map((infra) => (
              <span key={infra} className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded text-xs">{infra}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Competitions & Certificates */}
      <div className="space-y-8 pl-8 border-l border-white">
        {/* Competitions */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-600 dark:text-blue-400">
            <Trophy className="mr-2 w-6 h-6" /> Competitions
          </h3>

          <div className="relative pl-8">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white"></div>

            <div className="space-y-6">
              {competitions.map((comp) => (
                <div key={comp.title} className="relative flex items-start">
                  {/* <span className="w-3 h-3 rounded-full bg-white absolute left-[13px] top-1.5"></span> */}
                  <div className="ml-6 text-base text-gray-900 dark:text-white">
                    <span className="font-semibold mr-2">{comp.rank}</span>
                    <span>{comp.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center text-green-600 dark:text-green-400">
            <Award className="mr-2 w-6 h-6" /> Certificates
          </h3>

          <div className="relative pl-8">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white"></div>

            <div className="space-y-6">
              {certificates.map((cert) => (
                <div key={cert.title} className="relative flex items-start">
                  {/* <span className="w-3 h-3 rounded-full bg-white absolute left-[13px] top-1.5"></span> */}
                  <div className="ml-6 text-base text-gray-900 dark:text-white font-semibold">
                    {cert.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>

      {/* Projects */}
      <motion.section custom={3} variants={fadeIn} className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-1">Featured Projects</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Some of my recent work</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.title}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition group"
              custom={idx + 1}
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <Link to={`/projects/${proj.slug}`}>
                <img src={proj.image} alt={proj.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-4">
                  <h3 className="text-base font-semibold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">{proj.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {proj.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded">{tech}</span>
                    ))}
                  </div>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 text-xs font-medium">
                    View Project <ArrowRight className="ml-1 w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/projects"
            className="inline-flex items-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
          >
            View All Projects <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section
        custom={4}
        variants={fadeIn}
        className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8 space-y-4"
      >
        <h2 className="text-xl font-bold">Let's Connect</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          I'm open to new opportunities, collaborations, or tech discussions.
        </p>

        {/* Icon Links */}
        <div className="flex justify-center space-x-6">
          {contactLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {link.icon === 'github' && <Github className="w-6 h-6" />}
              {link.icon === 'linkedin' && <Linkedin className="w-6 h-6" />}
              {link.icon === 'mail' && <Mail className="w-6 h-6" />}
            </a>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
