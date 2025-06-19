import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/doc-tech', label: 'Doc-Tech' },
    { path: '/resume', label: 'Resume' },
  ];

  const socialLinks = [
    { href: 'https://github.com/huyentranq', icon: Github, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/trang-nguyen-huyen-674109249/', icon: Linkedin, label: 'LinkedIn' },
    { href: 'nguyenhuyentrangg457@gmail.com', icon: Mail, label: 'Email' },
  ];

  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-3">
        <div className="flex items-center justify-between">
          {/* Social Links */}
          <div className="flex items-center space-x-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === path
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {label}
                {location.pathname === path && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                    layoutId="navbar-indicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;