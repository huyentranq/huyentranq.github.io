import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import TableOfContents from '../components/TableOfContents';
import GitHubRepoCard from '../components/GitHubRepoCard';
import projectsMeta from '../data/projectsMeta';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const meta = slug ? projectsMeta[slug] : null;

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        let projectContent = '';

        switch (slug) {
          case 'movie-recommendation-system':
            try {
              const response = await fetch(`${import.meta.env.BASE_URL}projects/TMDB/prj1.md`);
              if (!response.ok) throw new Error('Failed to load markdown');
              projectContent = await response.text();
            } catch (err) {
              setError(true);
              setLoading(false);
              return;
            }
            break;


          default:
            setError(true);
            setLoading(false);
            return;
        }

        setContent(projectContent);

        const headingRegex = /^(#{1,6})\s+(.*)$/gm;
        const extractedHeadings: Array<{ id: string; text: string; level: number }> = [];
        let match;

        while ((match = headingRegex.exec(projectContent)) !== null) {
          const level = match[1].length;
          const text = match[2];
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          extractedHeadings.push({ id, text, level });
        }

        setHeadings(extractedHeadings);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    if (slug) {
      loadProject();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="py-16 flex justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <motion.div
      className="py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-3/4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8 text-xl"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Projects
            </Link>
          </motion.div>

          {/* GitHub Repo Card (only if exists) */}
          {meta?.githubUrl && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <GitHubRepoCard
                url={meta.githubUrl}
                name={meta.githubUrl.split('/').slice(-2).join('/')}
                description={meta.description}
                stars={meta.stars}
                forks={meta.forks}
                tech={meta.tech}
              />
            </motion.div>
          )}

          <motion.article
            className="prose prose-invert prose-xl max-w-none"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ children, ...props }) => (
                  <h1 id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')} {...props}>
                    {children}
                  </h1>
                ),
                h2: ({ children, ...props }) => (
                  <h2 id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')} {...props}>
                    {children}
                  </h2>
                ),
                h3: ({ children, ...props }) => (
                  <h3 id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')} {...props}>
                    {children}
                  </h3>
                ),
                h4: ({ children, ...props }) => (
                  <h4 id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')} {...props}>
                    {children}
                  </h4>
                ),
                h5: ({ children, ...props }) => (
                  <h5 id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')} {...props}>
                    {children}
                  </h5>
                ),
                h6: ({ children, ...props }) => (
                  <h6 id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')} {...props}>
                    {children}
                  </h6>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </motion.article>
        </div>

        <div className="lg:w-1/4">
          <TableOfContents headings={headings} />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
