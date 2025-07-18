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


const skillsSection = [
  {
    title: 'Data Engineering',
    items: [
      'ETL/ELT Pipelines',
      'Streaming & Batch Processing',
      'Apache Spark',
      'Apache Kafka',
      'Airflow / Dagster',
    ],
  },
  {
    title: 'Programming & Querying',
    items: [
      'Python',
      'SQL',
      'Bash',
      'PySpark',
      'R (basic analytics)',
    ],
  },
  {
    title: 'Cloud & DevOps',
    items: [
      'Docker ',
      'Linux',
      'CI (GitHub Actions)',
    ],
  },
  {
    title: 'Other skills',
    items: [
      'Power BI',
      'Machine Learning/Modeling',
      'Excel',

    ],
  },
];




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
{/* About Me Section */}
<motion.section
  custom={1}
  variants={fadeIn}
  className="flex flex-col md:flex-row items-center justify-center gap-10"
>
{/* Avatar with glow effect */}
<div className="relative group w-60 h-60">
  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
  <img
    src="/images/avt2.jpg"
    alt="Avatar"
    className="relative rounded-full w-60 h-60 object-cover border-4 border-white shadow-xl rotate-[10deg]"
  />

</div>

  {/* About Me Right */}
  <div className="text-left space-y-4 max-w-xl">
    <h2 className="text-2xl font-bold text-pink-400">About Me</h2>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
      Hello! I'm <span className="font-semibold text-purple-500">Huyen Trang</span>, a Data Science student
      passionate about <span className="text-blue-500">Big Data</span>, <span className="text-blue-500">Machine Learning</span>, and
      building modern data platforms.
    </p>
    <p className="text-gray-600 dark:text-gray-400 text-sm">
      I'm currently diving deeper into data engineering and real-time data processing using open-source tools.
    </p>

  </div>
</motion.section>
{/* ✅ Technical Skills */}
<motion.section variants={fadeIn} custom={2} className="space-y-6">
  <h2 className="text-xl font-bold text-center">Technical Skills</h2>
  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
    {skillsSection.map((section, index) => (
      <motion.div
        key={section.title}
        className="bg-[#1e1b4b] text-white rounded-xl p-6 shadow-md"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
      <h3 className="text-lg font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 drop-shadow-sm">
        {section.title}
      </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          {section.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm leading-snug break-words"
            >
              <span className="text-pink-400 mt-0.5">🌸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    ))}
  </div>
</motion.section>

{/* Featured Sections */}
<motion.section custom={3} variants={fadeIn} className="space-y-8">
  <div className="text-center">
    <h2 className="text-2xl font-bold mb-1 text-white">Explore</h2>
    <p className="text-blue-200 text-base">
      Dive deeper into my work and resources
    </p>
  </div>

  <div className="grid md:grid-cols-2 gap-6">
    {/* Project Section */}
    <motion.div
      className="bg-[#1e1b4b] rounded-xl overflow-hidden hover:shadow-xl transition group"
      whileHover={{ y: -5 }}
    >
      <Link to="/projects">
        <img
          src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Projects"
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="p-4">
          <h3 className="text-base font-semibold mb-1 text-white group-hover:text-pink-400">
            Projects
          </h3>
          <p className="text-sm text-blue-100 mb-2">
            A collection of data-driven applications and real-world systems I've built.
          </p>
          <div className="flex items-center text-pink-300 text-xs font-medium">
            View Projects <ArrowRight className="ml-1 w-3 h-3" />
          </div>
        </div>
      </Link>
    </motion.div>

    {/* Tech Doc Section */}
    <motion.div
      className="bg-[#1e1b4b] rounded-xl overflow-hidden hover:shadow-xl transition group"
      whileHover={{ y: -5 }}
    >
      <Link to="/Doc-Tech">
        <img
          src="https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Tech Docs"
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="p-4">
          <h3 className="text-base font-semibold mb-1 text-white group-hover:text-pink-400">
            My Tech-Docs
          </h3>
          <p className="text-sm text-blue-100 mb-2">
            Helpful technical guides, tutorials, and internal documentation for data projects.
          </p>
          <div className="flex items-center text-pink-300 text-xs font-medium">
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
