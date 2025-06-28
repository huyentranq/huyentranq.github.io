import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import ReactMarkdown from 'react-markdown';


interface SnippetDetail {
  type: 'text' | 'code' | 'image';
  content?: string;
  src?: string;
  alt?: string;
}

interface Snippet {
  id: string;
  category: string;
  title: string;
  description: string;
  code?: string;
  details?: SnippetDetail[];
}

const DocTech: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeSparkTopic, setActiveSparkTopic] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch('data/snippets.json');
      const data = await response.json();
      if (!Array.isArray(data)) {
        console.error('Dữ liệu snippets.json không phải là mảng:', data);
        return;
    }
      setSnippets(data);
    };
    loadData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveSparkTopic(null);
  };


const renderDetailBlock = (detail: SnippetDetail, index: number) => {
  switch (detail.type) {
    case 'text':
      return (
        <ReactMarkdown
          key={index}
          className="prose prose-sm prose-invert text-gray-300 mb-4 max-w-none"
        >
          {detail.content || ''}
        </ReactMarkdown>
      );

    case 'code':
      return (
        <pre
          key={index}
          className="bg-black text-green-200 p-3 text-sm rounded mb-4 overflow-x-auto whitespace-pre"
        >
          <code>{detail.content}</code>
        </pre>
      );

    case 'image':
      return (
        <img
          key={index}
          src={detail.src}
          alt={detail.alt || ''}
          className="rounded shadow mb-4 max-w-full"
        />
      );

    default:
      return null;
  }
};


  const filteredSnippets = snippets.filter((snippet) => {
    const matchCategory = activeCategory === 'all' || snippet.category === activeCategory;
    const matchSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const sparkSnippets = snippets.filter((s) =>
        ['spark', 'pyspark'].includes(s.category)
    );
  const selectedSpark = sparkSnippets.find((s) => s.id === activeSparkTopic);

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
        <h2 className="text-2xl font-bold text-blue-600">Doc-Tech</h2>
        <p className="text-gray-400 text-sm">Trang tài liệu cá nhân của bạn</p>
      </motion.div>

      {/* Search box */}
      <div className="max-w-sm mx-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10 pr-3 py-2 border rounded-md w-full text-sm bg-white text-black"
        />
      </div>

      {/* Category buttons */}
      <div className="flex justify-center gap-3">
        {['all', 'javascript', 'python', 'java', 'spark'].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {category === 'all' ? 'Tất cả' : category}
          </button>
        ))}
      </div>

      {/* Spark mode layout */}
      {activeCategory === 'spark' ? (
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-1/4 border-r pr-4 space-y-2">
            {sparkSnippets.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveSparkTopic(topic.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeSparkTopic === topic.id
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-200 text-gray-700'
                }`}
              >
                {topic.title}
              </button>
            ))}
          </div>

          {/* Main content */}
          <div className="w-3/4">
            {selectedSpark ? (
              <motion.div
                key={selectedSpark.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 text-white p-4 rounded shadow"
              >
                <h3 className="text-lg font-semibold mb-2">{selectedSpark.title}</h3>
                <p className="text-sm mb-4 text-gray-300">{selectedSpark.description}</p>
                {selectedSpark.details
                  ? selectedSpark.details.map((detail, idx) => renderDetailBlock(detail, idx))
                  : selectedSpark.code && (
                      <pre className="bg-black text-green-200 p-3 text-sm rounded overflow-x-auto">
                        <code>{selectedSpark.code}</code>
                      </pre>
                    )}
              </motion.div>
            ) : (
              <p className="text-gray-400">Chọn một chủ đề Spark bên trái để xem nội dung.</p>
            )}
          </div>
        </div>
      ) : (
        // Normal viewer
        <div className="space-y-4">
          {filteredSnippets.length === 0 ? (
            <p className="text-center text-gray-400">Không có đoạn mã phù hợp.</p>
          ) : (
            filteredSnippets.map((snippet, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-100 rounded-md p-4 shadow"
              >
                <h4 className="font-semibold text-gray-800">{snippet.title}</h4>
                <p className="text-sm text-gray-500 mb-2">{snippet.description}</p>
                <pre className="bg-gray-800 text-white p-2 text-sm rounded overflow-x-auto">
                  <code>{snippet.code}</code>
                </pre>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DocTech;
