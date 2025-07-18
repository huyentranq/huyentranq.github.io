import React from 'react';
import { motion } from 'framer-motion';
import {
  Download, ExternalLink, Mail, Phone, MapPin, Trophy, Award
} from 'lucide-react';

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
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Data Science',
      school: 'University of Science - VNUHCM',
      period: '2023 - 2027',
      details: 'Accumulated GPA: 3.8/4'
    }
  ];

  const skills = {
    'Data Engineering': ['Apache Spark', 'Kafka', 'Airflow', 'Hadoop', 'Snowflake'],
    'Programming': ['Python', 'SQL', 'Scala', 'Java', 'JavaScript'],
    'Databases': ['PostgreSQL', 'MongoDB', 'Redis', 'Cassandra', 'BigQuery'],
  };

  const competitions = [
    { title: 'SCUDEM IX - International Challenge on Differential Equations Modeling', rank: '2nd Place' },
    { title: 'MCM/ICM 2025 - International Mathematical Contest in Modeling', rank: 'Honorable Award' },
    { title: 'MDS Datathon Challenge in Business', rank: 'Top 20' },
  ];

  const certificates = [
    { title: 'Advanced SQL Certificate', issuer: 'HackerRank' },
    { title: 'Fundamental Data Engineer', issuer: 'AIDE' },
  ];

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
      className="py-12 space-y-12 bg-gray-900 text-pink-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.section variants={itemVariants} className="text-center space-y-4">
        {/* Avatar */}
        <motion.div className="flex justify-center">
          <motion.img
            src="/images/avt.jpg"
            alt="Profile"
            className="rounded-full w-48 h-48 object-cover border-4 border-pink-300 shadow-lg hover:scale-105 hover:rotate-3 transition duration-300 ease-in-out rotate-[10deg]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

      {/* Title */}
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Resume
      </h1>

      <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        {/* Nếu cần thêm mô tả ngắn ở đây */}
      </p>

      {/* Action buttons */}
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

      </div>
    </motion.section>


      {/* Contact Info */}
      <motion.section variants={itemVariants} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">nguyenhuyentrangg457@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Thu Duc - Ho Chi Minh</span>
          </div>

        </div>
      </motion.section>
{/* Education + Competitions + Certificates */}
<motion.section variants={itemVariants} className="space-y-6">
  <h2 className="text-2xl font-bold text-center">Education & Achievements</h2>

  <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-4">


        {/* Education */}
        <div className="space-y-4 max-w-sm">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              className="bg-gray-50 dark:bg-gray-800 rounded-md p-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-base font-semibold text-green-600 dark:text-green-400 mb-1">
                {edu.degree}
              </h3>
              <p className="text-sm text-gray-800 dark:text-gray-200">{edu.school}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{edu.period}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{edu.details}</p>
            </motion.div>
          ))}
        </div>

        {/* Competitions & Certificates */}
        <div className="space-y-6 ">
          {/* Competitions */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center text-blue-600 dark:text-blue-400">
              <Trophy className="mr-2 w-5 h-5" /> Competitions
            </h3>
            <div className="space-y-3 pl-4 border-l border-gray-300 dark:border-gray-600">
              {competitions.map((comp) => (
                <div
                  key={comp.title}
                  className="text-sm text-gray-900 dark:text-white"
                >
                  <span className="font-semibold mr-2">{comp.rank}</span>
                  <span>{comp.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center text-green-600 dark:text-green-400">
              <Award className="mr-2 w-5 h-5" /> Certificates
            </h3>
            <div className="space-y-3 pl-4 border-l border-gray-300 dark:border-gray-600">
              {certificates.map((cert) => (
                <div
                  key={cert.title}
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  {cert.title}{' '}
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                    ({cert.issuer})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>


      {/* CTA */}
      <motion.section variants={itemVariants} className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-3">Let's Work Together</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          I'm always interested in new opportunities and challenging data engineering projects.
        </p>
      </motion.section>
    </motion.div>
  );
};

export default Resume;