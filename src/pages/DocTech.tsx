import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);

  const categoryList = ['spark', 'kafka'];
  const categoryMeta: Record<string, { title: string; description: string; image: string }> = {
    spark: {
      title: 'Spark',
      description: 'Distributed computing and big data processing.',
      image: '/images/spark/spark_im.png',
    },
    kafka: {
      title: 'Kafka',
      description: 'Stream processing and real-time data pipelines.',
      image: '/images/kafka/kafka_im.png',
    }
  };

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

  const filteredSnippets = snippets.filter(
    (snippet) => activeCategory === 'all' || snippet.category === activeCategory
  );
  const selectedTopic = snippets.find((s) => s.id === activeTopicId);

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
        <h2 className="text-2xl font-bold text-blue-600">Doc-Tech</h2>
        <p className="text-gray-400 text-sm">Trang tài liệu cá nhân của bạn</p>
      </motion.div>

      {/* Nút category luôn hiển thị */}
      <div className="flex justify-center gap-3">
        {['all', ...categoryList].map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setActiveTopicId(null);
            }}
            className={`px-4 py-1.5 rounded-md text-sm font-medium ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {category === 'all'
              ? 'Tất cả'
              : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

{activeCategory === 'all' && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {categoryList.map((cat) => {
      const meta = categoryMeta[cat];
      return (
        <div
          key={cat}
          className="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden shadow group cursor-pointer transform transition hover:scale-[1.01]"
          onClick={() => {
            setActiveCategory(cat);
            setActiveTopicId(null); // hoặc setActiveSparkTopic nếu dùng tên đó
          }}
        >
          <img
            src={meta.image}
            alt={meta.title}
            className="w-full md:w-1/3 h-20 object-cover"
          />
          <div className="p-3 text-white flex flex-col justify-center w-full md:w-2/3 bg-gray-900">
            <h3 className="text-base font-semibold text-blue-400">{meta.title}</h3>
            <p className="text-xs mt-1 text-gray-300">{meta.description}</p>
            <span className="text-blue-400 text-xs mt-2 hover:underline">
              Explore {meta.title} →
            </span>
          </div>
        </div>
      );
    })}
  </div>
)}




      {/* Nút quay lại */}
      {activeCategory !== 'all' && (
        <div className="text-left">
          <button
            className="text-blue-500 text-base hover:underline"
            onClick={() => {
              setActiveCategory('all');
              setActiveTopicId(null);
            }}
          >
            ← Quay lại
          </button>
        </div>
      )}

      {/* Layout detail cho các category */}
      {activeCategory !== 'all' && (
        <div className="flex gap-6">
          <div className="w-1/4 border-r pr-4 space-y-2">
            {snippets
              .filter((s) => s.category === activeCategory)
              .map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopicId(topic.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTopicId === topic.id
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {topic.title}
                </button>
              ))}
          </div>
          <div className="w-3/4">
            {selectedTopic ? (
              <motion.div
                key={selectedTopic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 text-white p-4 rounded shadow"
              >
                <h3 className="text-lg font-semibold mb-2">{selectedTopic.title}</h3>
                <p className="text-sm mb-4 text-gray-300">{selectedTopic.description}</p>
                {selectedTopic.details
                  ? selectedTopic.details.map((detail, idx) => renderDetailBlock(detail, idx))
                  : selectedTopic.code && (
                      <pre className="bg-black text-green-200 p-3 text-sm rounded overflow-x-auto">
                        <code>{selectedTopic.code}</code>
                      </pre>
                    )}
              </motion.div>
            ) : (
              <p className="text-gray-400">Chọn một chủ đề bên trái để xem nội dung.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocTech;
