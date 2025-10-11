import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

const Home = () => {
  const contactLinks = [
    { name: 'GitHub', url: 'https://github.com/huyentranq', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/trang-nguyen-huyen-674109249/', icon: 'linkedin' },
    { name: 'Gmail', url: 'mailto:nguyenhuyentrangg457@gmail.com', icon: 'mail' },
  ];

  const education = [
    {
      school: 'University of Science, VNU-HCM',
      degree: 'B.Sc. in Data Science - GPA: 8.9/10',
      period: '2023 – Present',
    }
  ];



  const skillsSection = [
    {
      title: 'Data Engineering',
      items: ['ETL/ELT Pipelines', 'Streaming & Batch Processing', 'Apache Spark', 'Apache Kafka', 'Airflow / Dagster'],
    },
    {
      title: 'Programming & Querying',
      items: ['Python', 'SQL', 'Bash', 'PySpark', 'R (basic analytics)'],
    },
    {
      title: 'Cloud & DevOps',
      items: ['Docker', 'Linux', 'CI (GitHub Actions)'],
    },
    {
      title: 'Other skills',
      items: ['Power BI', 'Machine Learning/Modeling', 'LLM Prompt Engineering','Fine-tuning'],
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
      {/* 🌸 About Me + Education + Competitions */}
      <motion.section custom={1} variants={fadeIn} className="flex flex-col md:flex-row items-start justify-center gap-10">
        {/* Avatar */}
        <div className="relative group w-60 h-60 mx-auto md:mx-0">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
          <img
            src="/images/avt2.jpg"
            alt="Avatar"
            className="relative rounded-full w-60 h-60 object-cover border-4 border-white shadow-xl rotate-[10deg]"
          />
        </div>

        {/* Right Column: About + Education + Competitions */}
        <div className="text-left space-y-6 max-w-2xl">
          {/* About Me */}
          <div>
            <h2 className="text-2xl font-bold text-pink-400 mb-2">About Me</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Hello! I'm <span className="font-semibold text-purple-500">Huyen Trang</span>, a Data Science student
              passionate about <span className="text-blue-500">Big Data</span>,{' '}
              <span className="text-blue-500">Large Language Model - LLM</span>, and building modern data platforms.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              I'm currently diving deeper into data engineering and real-time data processing using open-source tools.
            </p>
          </div>

          {/* Education Section */}
          <motion.div variants={fadeIn} custom={2}>
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Education 🎓</h3>
            <div className="space-y-3">
              {education.map((edu, i) => (
                <div key={i} className="border-l-2 border-purple-400 pl-3">
                  <p className="font-semibold text-white">{edu.school}</p>
                  <p className="text-sm text-gray-300">{edu.degree}</p>
                  <p className="text-xs text-gray-400 mb-1">{edu.period}</p>
                  <p className="text-xs text-gray-400">{edu.details}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Competitions Section */}

        </div>
      </motion.section>

      {/* ✅ Technical Skills */}
      <motion.section variants={fadeIn} custom={4} className="space-y-6">
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
                  <li key={item} className="flex items-start gap-2 text-sm leading-snug break-words">
                    <span className="text-pink-400 mt-0.5">🌸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>
{/* ✅ Featured Projects Section */}
<motion.section custom={5} variants={fadeIn} className="space-y-8">
  <div className="text-center">
    <h2 className="text-2xl font-bold mb-1 text-white">✨ My Projects</h2>
    <p className="text-blue-200 text-base">
      Explore my feature projects
    </p>
  </div>

  {/* Projects Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {[
      {
        title: 'Movie Recommendation System',
        description:
          'A data pipeline serving a movie recommendation system based on user behavior.',
        image:
          'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
        tech: ['Python', 'PySpark', 'ELT', 'DBT', 'Dagster'],
        github: 'https://github.com/huyentranq/TMDB-Pipeline-Recommendation',
        slug: 'movie-recommendation-system',
      },
      {
        title: 'Streaming Data Pipeline',
        description:
          'A real-time streaming pipeline showcasing data processing on pizza sales dataset.',
        image: '/projects/Streaming/images/pages.png',
        tech: ['Kafka', 'Spark', 'Python', 'PowerBI', 'Streaming'],
        github: 'https://github.com/huyentranq/Streaming-Data-pipeline',
        slug: 'streaming-data-pipeline',
      },
    ].map((project, index) => (
      <motion.div
        key={project.slug}
        className="bg-[#1e1b4b] rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
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
          </div>
        </div>

        <div className="p-5 flex flex-col justify-between">
          <Link to={`/projects/${project.slug}`}>
            <h3 className="text-lg font-semibold mb-2 text-pink-300 group-hover:text-pink-400 transition-colors">
              {project.title}
            </h3>
          </Link>

          <p className="text-gray-300 mb-3 text-sm leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-pink-700/50 text-white rounded-full text-xs"
              >
                {tech}
              </span>
            ))}
          </div>

          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center text-pink-300 font-medium hover:text-pink-200 transition-colors text-sm"
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
  </div>
</motion.section>


      {/* ✅ Contact */}
      <motion.section custom={6} variants={fadeIn} className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8 space-y-4">
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

export default Home;
