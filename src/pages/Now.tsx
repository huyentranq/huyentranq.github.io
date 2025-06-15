import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Book, Code, Coffee, Music, Target } from 'lucide-react';

const Now = () => {
  const currentActivities = [
    {
      icon: Code,
      title: 'Learning Rust',
      description: 'Diving deep into systems programming and exploring Rust\'s memory safety features',
      status: 'In Progress',
      color: 'text-orange-400'
    },
    {
      icon: Book,
      title: 'Reading "Designing Data-Intensive Applications"',
      description: 'Understanding the fundamentals of distributed systems and data architecture',
      status: 'Chapter 8',
      color: 'text-green-400'
    },
    {
      icon: Target,
      title: 'Building a Real-time Analytics Platform',
      description: 'Creating a dashboard for real-time data visualization using Kafka and React',
      status: 'MVP Phase',
      color: 'text-blue-400'
    },
    {
      icon: Coffee,
      title: 'Contributing to Open Source',
      description: 'Active contributor to various React and Node.js projects on GitHub',
      status: 'Ongoing',
      color: 'text-purple-400'
    }
  ];

  const goals = [
    'Complete AWS Solutions Architect Professional certification',
    'Launch my SaaS product by Q2 2024',
    'Speak at a major tech conference',
    'Contribute to 10 open source projects',
    'Learn WebAssembly and its practical applications'
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
      className="py-16 space-y-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.section variants={itemVariants} className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          What I'm Up To Now
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          A glimpse into my current projects, learning journey, and what's keeping me busy these days.
        </p>
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <Calendar size={16} />
          <span className="text-sm">Last updated: March 2024</span>
        </div>
      </motion.section>

      {/* Current Activities */}
      <motion.section variants={itemVariants} className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Current Focus</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {currentActivities.map((activity, index) => (
            <motion.div
              key={activity.title}
              className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gray-700 ${activity.color}`}>
                  <activity.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{activity.title}</h3>
                  <p className="text-gray-400 mb-3">{activity.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${activity.color}`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Goals */}
      <motion.section variants={itemVariants} className="space-y-8">
        <h2 className="text-3xl font-bold text-center">2024 Goals</h2>
        <div className="bg-gray-800 rounded-xl p-8">
          <div className="space-y-4">
            {goals.map((goal, index) => (
              <motion.div
                key={goal}
                className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-650 transition-colors duration-200"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <p className="text-gray-200">{goal}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Personal Interests */}
      <motion.section variants={itemVariants} className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Beyond Code</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-750 transition-colors duration-300">
            <Music className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Music Production</h3>
            <p className="text-gray-400">Creating electronic music in my spare time using Ableton Live</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-750 transition-colors duration-300">
            <Book className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Reading</h3>
            <p className="text-gray-400">Currently reading philosophy and sci-fi novels alongside tech books</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-750 transition-colors duration-300">
            <Coffee className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Coffee</h3>
            <p className="text-gray-400">Exploring different brewing methods and single-origin beans</p>
          </div>
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section variants={itemVariants} className="text-center bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">Want to Connect?</h2>
        <p className="text-gray-400 mb-6">
          If any of these projects interest you or you'd like to collaborate, feel free to reach out!
        </p>
        <a
          href="mailto:your.email@example.com"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors duration-200"
        >
          Let's Chat
        </a>
      </motion.section>
    </motion.div>
  );
};

export default Now;