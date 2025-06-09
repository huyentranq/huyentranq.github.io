import React from 'react';
import { Download, ExternalLink } from 'lucide-react';

const Resume: React.FC = () => {
  return (
    <section id="resume" className="py-16">
      <div className="section-container">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="text-primary-accent">Resume</span>
        </h2>
        
        <div className="section-bg p-8 animate-slide-up text-center">
          <h3 className="text-xl font-semibold mb-4">Download My Resume</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get a comprehensive overview of my experience, skills, and achievements in data engineering.
            Available in PDF format for easy viewing and printing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/resume.pdf"
              className="btn-primary inline-flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={16} />
              Download PDF
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2 border border-primary-accent text-primary-accent rounded-lg hover:bg-primary-accent hover:text-primary-bg transition-all duration-300 text-sm"
            >
              <ExternalLink size={16} />
              View Online
            </a>
          </div>
          
          <div className="mt-8 text-sm text-gray-400">
            <p>Last updated: January 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;