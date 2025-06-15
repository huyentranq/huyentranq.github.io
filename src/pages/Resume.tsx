import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const Resume = () => {
  const experience = [
    {
      title: 'Senior Data Engineer',
      company: 'TechCorp Solutions',
      period: '2022 - Present',
      description: [
        'Led development of data pipelines processing 10TB+ daily using Apache Spark and Kafka',
        'Implemented real-time analytics platform reducing query response time by 75%',
        'Designed and maintained data lake architecture on AWS with automated ETL processes',
        'Mentored junior engineers and established data engineering best practices'
      ]
    },
    {
      title: 'Data Engineer',
      company: 'DataFlow Inc',
      period: '2020 - 2022',
      description: [
        'Built and maintained ETL pipelines using Python, Airflow, and PostgreSQL',
        'Developed data quality monitoring systems with automated alerting',
        'Optimized database queries improving performance by 60%',
        'Collaborated with data scientists to productionize ML models'
      ]
    },
    {
      title: 'Software Developer',
      company: 'StartupXYZ',
      period: '2019 - 2020',
      description: [
        'Developed full-stack web applications using React and Node.js',
        'Implemented RESTful APIs and integrated third-party services',
        'Built automated testing suites and CI/CD pipelines',
        'Worked in agile environment with cross-functional teams'
      ]
    }
  ];

  const education = [
    {
      degree: 'Master of Science in Computer Science',
      school: 'University of Technology',
      period: '2017 - 2019',
      details: 'Specialization in Data Science and Machine Learning • GPA: 3.9/4.0'
    },
    {
      degree: 'Bachelor of Science in Software Engineering',
      school: 'State University',
      period: '2013 - 2017',
      details: 'Magna Cum Laude • GPA: 3.8/4.0'
    }
  ];

  const skills = {
    'Data Engineering': ['Apache Spark', 'Kafka', 'Airflow', 'Hadoop', 'Snowflake'],
    'Programming': ['Python', 'SQL', 'Scala', 'Java', 'JavaScript'],
    'Cloud Platforms': ['AWS', 'Google Cloud', 'Azure', 'Databricks'],
    'Databases': ['PostgreSQL', 'MongoDB', 'Redis', 'Cassandra', 'BigQuery'],
    'Tools & DevOps': ['Docker', 'Kubernetes', 'Terraform', 'Git', 'Jenkins']
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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
      className="py-12 space-y-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.section variants={itemVariants} className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Resume
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Data Engineer with 5+ years of experience building scalable data infrastructure and analytics platforms
        </p>
        
        {/* Download Buttons */}
        <div className="flex justify-center space-x-3">
          <a
            href="https://drive.google.com/file/d/your-resume-file-id/view"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm"
          >
            <ExternalLink className="mr-2 w-4 h-4" />
            View PDF
          </a>
          <a
            href="https://drive.google.com/uc?export=download&id=your-resume-file-id"
            className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors duration-200 text-sm"
          >
            <Download className="mr-2 w-4 h-4" />
            Download PDF
          </a>
        </div>
      </motion.section>

      {/* Contact Info */}
      <motion.section variants={itemVariants} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Contact Information</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-blue-500" />
            <span className="text-gray-700 dark:text-gray-300 text-sm">your.email@example.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-green-500" />
            <span className="text-gray-700 dark:text-gray-300 text-sm">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-gray-700 dark:text-gray-300 text-sm">San Francisco, CA</span>
          </div>
          <div className="flex items-center space-x-2">
            <Linkedin className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700 dark:text-gray-300 text-sm">linkedin.com/in/johndoe</span>
          </div>
        </div>
      </motion.section>

      {/* Experience */}
      <motion.section variants={itemVariants} className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Experience</h2>
        <div className="space-y-6">
          {experience.map((job, index) => (
            <motion.div
              key={`${job.company}-${job.period}`}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{job.title}</h3>
                  <p className="text-base text-gray-800 dark:text-gray-200">{job.company}</p>
                </div>
                <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">{job.period}</span>
              </div>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                {job.description.map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Education */}
      <motion.section variants={itemVariants} className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Education</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-base font-semibold text-green-600 dark:text-green-400 mb-2">{edu.degree}</h3>
              <p className="text-base text-gray-800 dark:text-gray-200 mb-1">{edu.school}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">{edu.period}</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{edu.details}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section variants={itemVariants} className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Technical Skills</h2>
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
                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section variants={itemVariants} className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-3">Let's Work Together</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
          I'm always interested in new opportunities and challenging data engineering projects.
        </p>
        <div className="flex justify-center space-x-3">
          <a
            href="mailto:your.email@example.com"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm"
          >
            <Mail className="mr-2 w-4 h-4" />
            Email Me
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors duration-200 text-sm"
          >
            <Linkedin className="mr-2 w-4 h-4" />
            LinkedIn
          </a>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Resume;