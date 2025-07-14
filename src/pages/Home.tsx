import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

const Home = () => {
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
      url: 'mailto:nguyenhuyentrangg457@gmail.com',
      icon: 'mail',
    },
  ];

  const skills = {
    'Data Engineering': ['ELT/ETL','Apache Spark','Kafka' ],
    'Tool & Teach': ['Docker','Git','CI','Airflow', 'Dagster'],
    'Programming': ['Python', 'SQL', 'R'],
    // 'Cloud Platforms': ['AWS', 'Google Cloud', 'Azure', 'Databricks'],

    // 'Tools & DevOps': ['Docker', 'Kubernetes', 'Terraform', 'Git', 'Jenkins'],
  };



  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <motion.div initial="hidden" animate="visible" className="py-12 space-y-16">
      {/* Avatar */}
      <motion.div className="flex justify-center">
        <img
          src="/images/avt2.jpg"
          alt="Profile"
          className="rounded-full w-48 h-48 object-cover border-4 border-white shadow-md rotate-6"
        />
      </motion.div>

      {/* Hero */}
      <motion.section custom={1} variants={fadeIn} className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-loose">
          Huyen Trang
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mt-6">
          A Data Science student passionate about big data and machine learning.
           I'm currently expanding my knowledge in modern data technologies
        </p>
      </motion.section>

      {/* ✅ Technical Skills */}
      <motion.section variants={fadeIn} custom={2} className="space-y-6">
        <h2 className="text-xl font-bold text-center">Technical Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(skills).map(([category, skillList], index) => (
            <motion.div
              key={category}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-base font-semibold text-purple-600 dark:text-purple-400 mb-3">{category}</h3>
              <div className="flex flex-wrap gap-1">
                {skillList.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

{/* Featured Sections */}
<motion.section custom={3} variants={fadeIn} className="space-y-8">
  <div className="text-center">
    <h2 className="text-2xl font-bold mb-1">Explore</h2>
    <p className="text-gray-600 dark:text-gray-400 text-base">Dive deeper into my work and resources</p>
  </div>

  <div className="grid md:grid-cols-2 gap-6">
      {/* Project Section */}
      <motion.div
        className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition group"
        whileHover={{ y: -5 }}
      >
        <Link to="/projects">
          <img
            src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Projects"
            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="p-4">
            <h3 className="text-base font-semibold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Projects
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-2">
              A collection of data-driven applications and real-world systems I've built.
            </p>
            <div className="flex items-center text-blue-600 dark:text-blue-400 text-xs font-medium">
              View Projects <ArrowRight className="ml-1 w-3 h-3" />
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Tech Doc Section */}
      <motion.div
        className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition group"
        whileHover={{ y: -5 }}
      >
        <Link to="/Doc-Tech">
          <img
            src="https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Tech Docs"
            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="p-4">
            <h3 className="text-base font-semibold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              My Tech-Docs
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-2">
              Helpful technical guides, tutorials, and internal documentation for data projects.
            </p>
            <div className="flex items-center text-blue-600 dark:text-blue-400 text-xs font-medium">
              Explore Docs <ArrowRight className="ml-1 w-3 h-3" />
            </div>
          </div>
        </Link>
      </motion.div>
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
