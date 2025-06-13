import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-primary-section/50">
      <div className="section-container">
        <div className="text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2 text-sm">
            © 2025 Trang Nguyen. Data tells stories – let's read them together.
            <Heart size={14} className="text-primary-accent animate-pulse" />
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;