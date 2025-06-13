import React from 'react';
import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '../projects/projectsData';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-16">
      <div className="section-container">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="text-primary-accent">Projects</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projectsData.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="block section-bg overflow-hidden card-hover animate-slide-up relative h-full"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              <div className="p-5 flex flex-col">
                <div className="flex items-center gap-3 pb-2 text-[#FFFFFF] font-semibold">
                  <Github size={16} /> <a href="https://github.com/huyentranq/TMDB-Pipeline-Recommendation">huyentranq/TMDB-Pipeline-Recommendation</a>
                </div>
                <h3 className="text-lg font-bold mb-2 text-primary-accent">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-3 text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary-bg text-primary-accent text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-primary-bg text-gray-400 text-xs rounded-full">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                {/* Thêm container flex cho thời gian và nút GitHub */}
                <div className="mt-auto flex items-center justify-between">
                  <div className="text-xs text-gray-400">
                    {project.time}
                  </div>
                  <a
                    href={project.githubUrl}
                    className="p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()} // Ngăn click vào card khi bấm GitHub
                  >
                  </a>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="#projects"
            className="btn-primary inline-block"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;