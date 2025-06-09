import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projectsData } from '../projects/projectsData';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-16">
      <div className="section-container">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="text-primary-accent">Projects</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="section-bg overflow-hidden card-hover animate-slide-up"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary-bg/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <a
                    href={project.githubUrl}
                    className="p-2 bg-primary-section rounded-full hover:bg-primary-accent hover:text-primary-bg transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={project.liveUrl}
                    className="p-2 bg-primary-section rounded-full hover:bg-primary-accent hover:text-primary-bg transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
              
              <div className="p-5">
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
              </div>
            </div>
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