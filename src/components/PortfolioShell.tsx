import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Briefcase,
  Database,
  FolderKanban,
  Github,
  GraduationCap,
  Home,
  Linkedin,
  Mail,
  Menu,
  Search,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react';

type NavigationItem = {
  label: string;
  to: string;
};

type NavigationGroup = {
  label: string;
  icon: React.ElementType;
  items: NavigationItem[];
};

const portfolioNavigation: NavigationGroup[] = [
  {
    label: 'Portfolio',
    icon: Home,
    items: [
      { label: 'About', to: '/?section=about' },
      { label: 'Experience', to: '/?section=experience' },
      { label: 'Education', to: '/?section=education' },
      { label: 'Skills', to: '/?section=skills' },
      { label: 'Recognition', to: '/?section=recognition' },
      { label: 'Contact', to: '/?section=contact' },
    ],
  },
  {
    label: 'Projects',
    icon: FolderKanban,
    items: [
      { label: 'All Projects', to: '/projects' },
      { label: 'TMDB Lakehouse', to: '/projects/movie-recommendation-system' },
      { label: 'Streaming Pipeline', to: '/projects/streaming-data-pipeline' },
      { label: 'Sketch to Image', to: '/projects/sketch-to-image-pix2pix' },
    ],
  },
  {
    label: 'Knowledge',
    icon: BookOpen,
    items: [
      { label: 'Doc-Tech', to: '/doc-tech' },
      { label: 'Technical Blog', to: '/blog' },
    ],
  },
];

const docTechNavigation: NavigationGroup[] = [
  {
    label: 'Kafka',
    icon: Database,
    items: [
      ['Kafka Overview', 'kafka-core'],
      ['Kafka Architecture', 'kafka-cli'],
      ['Producer and Event Design', 'kafka-python'],
      ['Consumer Groups and Offsets', 'kafka-consumer-groups'],
      ['Delivery and Reliability', 'kafka-reliability'],
      ['Patterns and Troubleshooting', 'kafka-troubleshooting'],
    ].map(([label, topic]) => ({ label, to: `/doc-tech?topic=${topic}` })),
  },
  {
    label: 'Spark / PySpark',
    icon: Sparkles,
    items: [
      ['Overview and Architecture', 'spark-architecture'],
      ['Execution Model', 'spark-session'],
      ['RDD, DataFrame, Dataset', 'spark-transform'],
      ['Transformations and Shuffle', 'spark-window'],
      ['Partitioning and Joins', 'spark-performance'],
      ['Structured Streaming', 'spark-streaming'],
      ['Lakehouse and Delta Lake', 'spark-delta'],
    ].map(([label, topic]) => ({ label, to: `/doc-tech?topic=${topic}` })),
  },
  {
    label: 'Airflow',
    icon: Briefcase,
    items: [
      ['Role and Architecture', 'airflow-cli'],
      ['Scheduling and DAG Design', 'airflow-dag'],
      ['Operators and Operations', 'airflow-xcom'],
    ].map(([label, topic]) => ({ label, to: `/doc-tech?topic=${topic}` })),
  },
  {
    label: 'Data Fundamentals',
    icon: GraduationCap,
    items: [
      ['Platforms and Processing', 'governance'],
      ['ETL and Data Modeling', 'dw-dl-etl'],
      ['Quality and Governance', 'quality'],
    ].map(([label, topic]) => ({ label, to: `/doc-tech?topic=${topic}` })),
  },
];

const PortfolioShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const isDocTech = location.pathname === '/doc-tech';
  const navigation = isDocTech ? docTechNavigation : portfolioNavigation;

  const filteredNavigation = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return navigation;
    return navigation
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => `${group.label} ${item.label}`.toLowerCase().includes(normalized)),
      }))
      .filter((group) => group.items.length > 0);
  }, [navigation, query]);

  const isActive = (to: string) => {
    const [path, search = ''] = to.split('?');
    if (search) return location.pathname === path && location.search === `?${search}`;
    if (path === '/') return location.pathname === '/' && to.includes(location.search || 'section=about');
    return location.pathname === path;
  };

  const sidebar = (
    <div className="flex h-full flex-col px-6 py-6">
      <div className="flex items-center justify-between border-b border-[#3b2632] pb-5">
        <Link to="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
          <Terminal className="h-5 w-5 text-[#ff4fa3]" />
          <div>
            <p className="text-sm font-bold text-white">huyen.portfolio</p>
            <p className="mt-0.5 text-[10px] text-[#806a75]">data_systems / v2.0</p>
          </div>
        </Link>
        <button className="text-[#806a75] hover:text-[#ff72b6] md:hidden" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
          <X className="h-4 w-4" />
        </button>
      </div>

      <label className="mt-5 flex items-center gap-2 border border-[#472c3a] bg-[#120c10] px-3 py-2 focus-within:border-[#ff4fa3]/70">
        <Search className="h-3.5 w-3.5 text-[#715d67]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="search_workspace..."
          className="min-w-0 flex-1 bg-transparent text-[11px] text-white outline-none placeholder:text-[#68545f]"
        />
        <span className="text-[9px] text-[#604d57]">/</span>
      </label>

      <nav className="mt-6 flex-1 space-y-6 overflow-y-auto pr-2" aria-label="Portfolio navigation">
        {filteredNavigation.map((group) => {
          const Icon = group.icon;
          return (
            <div key={group.label}>
              <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase text-[#d8d0d4]">
                <Icon className="h-3.5 w-3.5 text-[#ff4fa3]" />
                {group.label}
              </div>
              <div className="space-y-0.5 border-l border-[#432b37] pl-3">
                {group.items.map((item) => {
                  const active = isActive(item.to);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-1.5 text-[11px] leading-4 transition ${
                        active ? 'translate-x-1 text-[#ff67b0]' : 'text-[#8b7e85] hover:translate-x-1 hover:text-[#ded5da]'
                      }`}
                    >
                      <span className="mr-2 text-[#55404a]">{active ? '>' : '·'}</span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="mt-5 border-t border-[#3b2632] pt-4">
        <div className="flex items-center gap-1">
          {[
            { href: 'https://github.com/huyentranq', label: 'GitHub', icon: Github },
            { href: 'https://www.linkedin.com/in/trang-nguyen-huyen-674109249/', label: 'LinkedIn', icon: Linkedin },
            { href: 'mailto:nguyenhuyentrangg457@gmail.com', label: 'Email', icon: Mail },
          ].map(({ href, label, icon: Icon }) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={label} className="p-2 text-[#78646e] hover:text-[#ff67b0]">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
        <p className="mt-2 flex items-center gap-2 text-[9px] text-[#5f4e57]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff4fa3]" /> available_for_full_time
        </p>
      </div>
    </div>
  );

  return (
    <div className="portfolio-shell min-h-screen bg-[#0b0f12] text-[#e7e1e4]" style={{ fontFamily: '"Space Mono", ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[#3b2632] bg-[#0d0a0d]/95 px-4 backdrop-blur md:hidden">
        <Link to="/" className="flex items-center gap-2 text-xs font-bold text-white">
          <Terminal className="h-4 w-4 text-[#ff4fa3]" /> huyen.portfolio
        </Link>
        <button onClick={() => setIsMenuOpen(true)} className="text-[#bbaab2] hover:text-[#ff67b0]" aria-label="Open navigation">
          <Menu className="h-5 w-5" />
        </button>
      </header>

      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[290px] border-r border-[#3b2632] bg-[#0d0a0d] md:block xl:w-[320px]">
        {sidebar}
      </aside>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button className="absolute inset-0 bg-black/70" onClick={() => setIsMenuOpen(false)} aria-label="Close navigation overlay" />
          <aside className="relative h-full w-[86vw] max-w-[320px] border-r border-[#3b2632] bg-[#0d0a0d]">{sidebar}</aside>
        </div>
      )}

      <main className="min-h-screen md:ml-[290px] xl:ml-[320px]">{children}</main>
    </div>
  );
};

export default PortfolioShell;
