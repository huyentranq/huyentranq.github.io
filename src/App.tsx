import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import DocTech from './pages/DocTech';
import Resume from './pages/Resume';
import Blog from './pages/Blog';
import ScrollToTop from './components/ScrollToTop'; // ✅ đã import
import SnippetDetail from './pages/SnippetDetail';
import PortfolioShell from './components/PortfolioShell';

function App() {
  return (
    <Router>
      <PortfolioShell>
        <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/doc-tech" element={<DocTech />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/snippet/:id" element={<SnippetDetail />} />

            </Routes>
      </PortfolioShell>
    </Router>
  );
}

export default App;
