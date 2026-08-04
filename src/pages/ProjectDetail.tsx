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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const meta = slug ? projectsMeta[slug] : null;

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        let projectContent = '';

        switch (slug) {
          case 'sketch-to-image-pix2pix':
            try {
              const response = await fetch(`${import.meta.env.BASE_URL}projects/SketchToImage/readme.md`);
              if (!response.ok) throw new Error('Failed to load markdown');
              projectContent = await response.text();
            } catch (err) {
              setError(true);
              setLoading(false);
              return;
            }
            break;

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
          
          case 'streaming-data-pipeline':
            try {
              const response = await fetch(`${import.meta.env.BASE_URL}projects/Streaming/readme.md`)
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
      className="min-h-screen bg-[#0b0f12] px-5 py-10 text-[#d9d2d6] sm:px-8 lg:px-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row">
        <div className="lg:w-3/4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/projects"
              className="mb-8 inline-flex items-center text-[11px] font-bold text-[#ff67b0] transition-colors hover:text-[#ffa3d0]"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Projects
            </Link>
          </motion.div>

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
            className="project-terminal-prose text-[13px] leading-7 text-[#b8adb3]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ children, ...props }) => (
                  <h1
                    className="mt-12 mb-6 border-b border-[#492c3a] pb-3 text-3xl font-bold leading-tight text-[#ff4fa3]"
                    id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
                    {...props}
                  >
                    {children}
                  </h1>
                ),
                h2: ({ children, ...props }) => (
                  <h2
                    className="mt-10 mb-5 border-b border-[#3d2933] pb-2 text-2xl font-bold leading-snug text-[#ff67b0]"
                    id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
                    {...props}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children, ...props }) => (
                  <h3
                    className="mt-10 mb-5 text-lg font-bold leading-snug text-[#ff8fc5]"
                    id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
                    {...props}
                  >
                    {children}
                  </h3>
                ),
                h4: ({ children, ...props }) => (
                  <h4
                    className="text-base font-semibold tracking-wide mt-4 mb-2 text-blue-300"
                    id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
                    {...props}
                  >
                    {children}
                  </h4>
                ),
                h5: ({ children, ...props }) => (
                  <h5
                    className="text-base font-semibold tracking-wide mt-4 mb-2 text-neutral-300"
                    id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
                    {...props}
                  >
                    {children}
                  </h5>
                ),
                h6: ({ children, ...props }) => (
                  <h6
                    className="text-base font-medium mt-5 mb-2 leading-normal text-neutral-200"
                    id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
                    {...props}
                  >
                    {children}
                  </h6>
                ),
                ul: ({ children, ...props }) => (
                  <ul className="list-disc ml-6 mb-4 space-y-2" {...props}>
                    {children}
                  </ul>
                ),
                ol: ({ children, ...props }) => (
                  <ol className="list-decimal ml-6 mb-4 space-y-2" {...props}>
                    {children}
                  </ol>
                ),
                li: ({ children, ...props }) => (
                  <li className="leading-7" {...props}>
                    {children}
                  </li>
                ),
                img: ({ src = '', alt = '', ...props }) => (
                  <img
                    src={src}
                    alt={alt}
                    className="cursor-zoom-in max-w-full rounded-lg shadow-md my-4"
                    onClick={() => handleImageClick(src)}
                    {...props}
                  />
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

      {/* Modal overlay to view full image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={handleCloseImage}
        >
          <img
            src={selectedImage}
            alt=""
            className="max-w-[80vw] max-h-[80vh] object-contain rounded-xl shadow-lg"
          />
        </div>
      )}
    </motion.div>
  );
};

export default ProjectDetail;
