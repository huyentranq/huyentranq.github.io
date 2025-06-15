// DocTechMini.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Code, Search } from 'lucide-react';

const DocTechMini = () => {
  const [activeCategory, setActiveCategory] = useState('data');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'data', label: 'Data Engineering', icon: Database },
    { id: 'python', label: 'Python', icon: Code },
  ];

  const snippets = {
    data: [
      {
        title: 'Spark Transform',
        description: 'Simple Spark DataFrame transformation',
        code: `df.filter(col("status") == "active")\n  .groupBy("type")\n  .count()`,
      },
    ],
    python: [
      {
        title: 'Hello World',
        description: 'Basic Python function',
        code: `def greet(name):\n    print(f"Hello, {name}!")`,
      },
      {
        title: 'Sum List',
        description: 'Summing values in a list',
        code: `nums = [1, 2, 3]\ntotal = sum(nums)`,
      },
    ],
  };

  const filtered = snippets[activeCategory].filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-blue-600">DocTech Mini</h2>
        <p className="text-gray-500 text-sm">Tiny code snippet viewer</p>
      </motion.div>

      {/* Search */}
      <div className="max-w-sm mx-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-3 py-2 border rounded-md w-full text-sm"
        />
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-3">
        {categories.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveCategory(id)}
            className={`flex items-center px-4 py-1.5 rounded-md text-sm ${
              activeCategory === id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </button>
        ))}
      </div>

      {/* Snippets */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400">No snippets found.</p>
        ) : (
          filtered.map((s, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-100 rounded-md p-4 shadow"
            >
              <h4 className="font-semibold text-gray-800">{s.title}</h4>
              <p className="text-sm text-gray-500 mb-2">{s.description}</p>
              <pre className="bg-gray-800 text-white p-2 text-sm rounded overflow-x-auto">
                <code>{s.code}</code>
              </pre>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default DocTechMini;
