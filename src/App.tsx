import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import DocTech from './pages/DocTech';
import Resume from './pages/Resume';
import ScrollToTop from './components/ScrollToTop'; // ✅ đã import

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          <Navbar />
          <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <ScrollToTop /> {/* ✅ THÊM VÀO ĐÂY */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/doc-tech" element={<DocTech />} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
