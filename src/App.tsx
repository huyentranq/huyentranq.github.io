import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Competitions from './components/Competitions';
import Blog from './components/Blog';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Competitions />
        <Blog />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
