import React from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Mail,
  MapPin,
  Trophy,
  Award,
  ChevronDown,
  Github,
  Linkedin
} from 'lucide-react';

const Resume = () => {
  const contactLinks = [
    { name: 'GitHub', url: 'https://github.com/huyentranq', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/trang-nguyen-huyen-674109249/', icon: 'linkedin' },
    { name: 'Gmail', url: 'mailto:nguyenhuyentrangg457@gmail.com', icon: 'mail' },
  ];

  const education = [
    {
      degree: 'Bachelor of Data Science',
      school: 'University of Science - VNUHCM',
      period: '2023 - 2027',
      details: 'Accumulated GPA: 8.9/10'
    }
  ];

  const competitions = [
    {
      title: 'SCUDEM IX - International Challenge on Differential Equations Modeling',
      rank: '2nd Place',
      year: '2024',
details: 'Developed a system of differential equations to model the diffusion of positive and negative messages and their impact on voting behavior in the U.S. presidential election. The work provided quantitative insights into long-term opinion dynamics and achieved a score of 3.88/4.'
    },
    {
      title: 'MCM/ICM 2025 - International Mathematical Contest in Modeling',
      rank: 'Honorable Award',
      year: '2025',
details:
    'Built a predictive model for the Olympic Games using 17 athlete and country performance factors. Combined multiple machine learning models (XGBoost, LightGBM, Random Forest) to improve accuracy and used Bayesian Bootstrap to estimate prediction uncertainty. The analysis revealed the “Great Coach Effect” — showing that having elite coaches greatly boosts a nation’s medal performance.',
},
    {
      title: 'MDS Datathon Challenge in Business',
      rank: 'Top 20',
      year: '2024',
      details: 'a data analytics competition focused on solving real-world economic analysis problems. Applied data cleaning, feature engineering, and predictive modeling to uncover key economic insights and support data-driven decision making.'
    },
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

  // ✅ Thêm fadeIn variant bị thiếu
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const [expanded, setExpanded] = React.useState(null);
  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <motion.div
      className="py-12 space-y-12 bg-gray-900 text-pink-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.section variants={itemVariants} className="text-center space-y-4">
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

        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Resume
        </h1>

        <div className="flex justify-center space-x-3">
          <a
            href="https://drive.google.com/file/d/1j1NsRCnuKQN2ZaZBu0KWSDY7TqZncHzY/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm"
          >
            <ExternalLink className="mr-2 w-4 h-4" />
            View PDF
          </a>
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
          <div className="space-y-6">
            {/* Competitions */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center text-blue-600 dark:text-blue-400">
                <Trophy className="mr-2 w-5 h-5" /> Competitions
              </h3>
              <div className="space-y-3 pl-4 border-l border-gray-300 dark:border-gray-600">
                {competitions.map((comp, index) => (
                  <motion.div
                    key={comp.title}
                    onClick={() => toggleExpand(index)}
                    className={`cursor-pointer bg-gray-50 dark:bg-gray-700 rounded-md p-3 shadow-sm hover:shadow-md transition 
                      ${expanded === index ? 'border-l-4 border-blue-500' : ''}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">{comp.rank}</span>{' '}
                        <span className="text-gray-900 dark:text-white">{comp.title}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: expanded === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{
                        height: expanded === index ? 'auto' : 0,
                        opacity: expanded === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden text-sm text-gray-700 dark:text-gray-300 mt-2"
                    >
                      <p><strong>Year:</strong> {comp.year}</p>
                      <p>{comp.details}</p>
                    </motion.div>
                  </motion.div>
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
{/* ✅ Contact */}
<motion.section variants={fadeIn} className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8 space-y-4">
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

  {/* ✅ Hiện tên email */}
  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
    📧 nguyenhuyentrangg457@gmail.com
  </p>
</motion.section>

    </motion.div>
  );
};

export default Resume;
