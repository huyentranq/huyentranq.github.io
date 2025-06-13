import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-8 animate-fade-in">
      <div className="section-container">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-text mb-3">
          Portfolio
        </h1>
        <div className="w-20 h-1 bg-primary-accent mx-auto rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;