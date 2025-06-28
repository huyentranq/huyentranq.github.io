import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Snippet {
  category: string;
  id: string;
  title: string;
  description: string;
  code: string;
}

const SnippetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [snippet, setSnippet] = useState<Snippet | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/data/snippets.json');
      const data: Snippet[] = await res.json();
      const found = data.find((s) => s.id === id);
      setSnippet(found || null);
    };
    fetchData();
  }, [id]);

  if (!snippet) return <div className="p-6 text-gray-400">Không tìm thấy nội dung.</div>;

  return (
    <div className="p-6">
      <Link to="/" className="text-blue-500 text-sm hover:underline">&larr; Quay lại</Link>
      <h1 className="text-2xl font-bold text-blue-600 mb-2">{snippet.title}</h1>
      <div className="text-gray-500 mb-4 whitespace-pre-line">{snippet.description}</div>
      <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto whitespace-pre">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export default SnippetDetail;
