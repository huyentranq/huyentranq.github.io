import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Competitions from './components/Competitions';
import Resume from './components/Resume';
import Blog from './components/Blog';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-primary-bg">
      <Navigation />
      <Header />
      <main>
        <Hero />
        <Projects />
        <Competitions />
        <Resume />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}

export default App;