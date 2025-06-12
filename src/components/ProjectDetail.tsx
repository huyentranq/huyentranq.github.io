import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { projectsData } from '../projects/projectsData';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug'; // Modified: Import rehype-slug
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Modified: Interface cho heading
interface Heading {
  id: string;
  text: string;
  level: number;
}

// Modified: Hàm trích xuất các heading từ markdown (chỉ lấy h2 và h3)
const extractHeadings = (markdown: string): Heading[] => {
  const headingRegex = /^(#{1,6})\s+(.*)$/gm;
  const headings: Heading[] = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    // Lấy chỉ h2 (##) và h3 (###)
    if (level === 2 || level === 3) {
      const text = match[2].trim();
      // Tạo id giống như rehype-slug (chuyển về chữ thường, thay thế ký tự không hợp lệ)
      const id = text.toLowerCase().replace(/[^\w]+/g, '-');
      headings.push({ id, text, level });
    }
  }
  return headings;
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const project = projectsData.find((p) => String(p.id) === id);
  const [markdown, setMarkdown] = useState('');
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeading, setActiveHeading] = useState(''); // Modified: state để theo dõi heading hiện hành

  useEffect(() => {
    if (!id) return;
    fetch(`/readmes/project-${id}.md`)
      .then((res) => res.text())
      .then((text) => {
        setMarkdown(text);
        setHeadings(extractHeadings(text)); // Modified: Lấy danh mục phụ lục từ markdown
      })
      .catch(() => setMarkdown('# 404\nProject details not found.'));
  }, [id]);

  // Modified: IntersectionObserver để theo dõi heading hiện hành
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHeading(entry.target.id);
        }
      });
    };
    const observerOptions = {
      rootMargin: '-50% 0px -50% 0px', // Để khi heading ở giữa viewport thì active
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const headingElements = document.querySelectorAll("article.prose h2, article.prose h3");
    headingElements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, [markdown]);

  if (!project) return <div className="text-red-500">Project not found.</div>;

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto"> {/* Modified: giảm kích cỡ container */}
      {/* Breadcrumb */}
      <div className="text-lg text-gray-400 mb-2">
        <Link to="/#projects" className="flex items-center hover:underline">
          <ArrowLeft size={20} className="mr-2" />
          Projects
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-xs bg-primary-bg text-primary-accent rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Main Content and Dynamic Appendix Layout */}
      <div className="flex gap-8">
        {/* Main markdown content */}
        <article className="prose prose-invert max-w-none flex-1">
          {/* Modified: Sử dụng rehypeSlug để đảm bảo các heading có id */}
          <ReactMarkdown rehypePlugins={[rehypeSlug]}>{markdown}</ReactMarkdown>
        </article>

        {/* Dynamic Appendix sidebar */}
        {/* Dynamic Appendix sidebar */}
        {/* Dynamic Appendix sidebar */}
        <aside className="w-64 sticky top-20 self-start text-sm">
          <div className="bg-primary-section p-4 rounded-lg">
            <h2 className="text-xl text-white mb-2">Table of Contents</h2>
            {headings.length > 0 ? (
              <ul className="space-y-2">
                {headings.map((heading) => (
                  <li key={heading.id} style={{ marginLeft: (heading.level - 2) * 16 }}>
                    <a 
                      href={`#${heading.id}`} 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(heading.id);
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`text-primary-accent hover:underline ${activeHeading === heading.id ? 'underline' : ''}`}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">No headings found.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectDetail;