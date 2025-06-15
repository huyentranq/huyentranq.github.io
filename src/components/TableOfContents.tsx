import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [activeHeading, setActiveHeading] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);

        if (visibleHeadings.length > 0) {
          setActiveHeading(visibleHeadings[0]);
        }
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Account for sticky navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="sticky top-24 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-fit"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="text-base font-semibold mb-3 text-gray-800 dark:text-gray-200">Table of Contents</h3>
      <nav>
        <ul className="space-y-1">
          {headings.map(({ id, text, level }) => (
            <motion.li
              key={id}
              style={{ paddingLeft: `${(level - 1) * 8}px` }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => scrollToHeading(id)}
                className={`block w-full text-left text-xs py-1 px-2 rounded transition-all duration-200 ${
                  activeHeading === id
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 border-l-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {text}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default TableOfContents;