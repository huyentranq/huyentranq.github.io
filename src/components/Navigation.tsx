import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#competitions', label: 'Competitions' },
    { href: '#blog', label: 'Blog' },
    { href: 'https://drive.google.com/file/d/your-drive-file-id/view', label: 'Resume' }

  ];

  const getLinkTo = (href: string) => (href.startsWith('#') ? `/${href}` : href);

  // Hàm xử lý cuộn tới phần cần đến
  const handleAnchorClick = (hash: string) => {
    // Nếu đã ở trang chủ
    if (location.pathname === '/') {
      // Tìm phần tử theo id (loại bỏ dấu '#' để dùng cho getElementById)
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-primary-section/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-primary-accent font-bold text-lg">HT</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) =>
              item.label === 'Resume' ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={getLinkTo(item.href)}
                  className="nav-link"
                  onClick={() =>
                    item.href.startsWith('#')
                      ? handleAnchorClick(item.href)
                      : setIsMenuOpen(false)
                  }
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-text hover:text-primary-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-primary-accent/20">
            <div className="flex flex-col space-y-3 pt-3">
              {navItems.map((item) =>
                item.label === 'Resume' ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className="nav-link"
                    onClick={() => setIsMenuOpen(false)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    to={getLinkTo(item.href)}
                    className="nav-link"
                    onClick={() =>
                      item.href.startsWith('#')
                        ? handleAnchorClick(item.href)
                        : setIsMenuOpen(false)
                    }
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;