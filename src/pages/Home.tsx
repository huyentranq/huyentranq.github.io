import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Database,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Medal,
  Trophy,
} from 'lucide-react';

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const listReveal = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
};

const Section = ({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.section
    id={id}
    variants={reveal}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.28 }}
    className="grid gap-6 border-t border-slate-200 py-12 dark:border-white/10 md:grid-cols-[190px_1fr]"
  >
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-300">
        {eyebrow}
      </p>
    </div>
    <div className="max-w-3xl">
      <h2 className="text-2xl font-black leading-tight text-slate-950 dark:text-white sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </div>
  </motion.section>
);

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const section = new URLSearchParams(location.search).get('section');
    if (!section) return;
    window.setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
  }, [location.search]);

  const profile = {
    name: 'Nguyen Thi Huyen Trang',
    role: 'Aspiring Data Engineer / Data Scientist',
    location: 'Ho Chi Minh City, Vietnam',
    email: 'nguyenhuyentrangg457@gmail.com',
    phone: '+84 457 4767',
    github: 'https://github.com/huyentranq',
    linkedin: 'https://www.linkedin.com/in/trang-nguyen-huyen-674109249/',
  };

  const achievements = [
    {
      title: 'MCM/ICM 2025',
      result: 'Honorable Mention',
      detail: 'Built Olympic medal prediction models using ensemble learning and uncertainty estimation.',
      icon: Medal,
    },
    {
      title: 'SCUDEM IX',
      result: '2nd Prize',
      detail: 'Modeled information diffusion and voting behavior with differential equations.',
      icon: Trophy,
    },
    {
      title: 'Vallet Scholarship 2025',
      result: 'Scholarship Recipient',
      detail: 'Recognized for strong academic and research performance.',
      icon: Award,
    },
    {
      title: 'MDS Datathon Challenge',
      result: 'Top 20 Semi-finalist',
      detail: 'Advanced to the semi-final round in a business data analytics competition.',
      icon: Award,
    },
  ];

  const certificates = [
    { title: 'Advanced SQL Certificate', issuer: 'HackerRank' },
    { title: 'Fundamental Data Engineer', issuer: 'AIDE' },
  ];

  const skills = [
    {
      label: 'Data Engineering',
      items: [
        'Python',
        'SQL',
        'ETL/ELT',
        'Batch & Streaming Pipelines',
        'PySpark',
        'Apache Kafka',
        'Apache Airflow',
        'Dagster',
        'dbt',
        'Delta Lake',
        'MinIO / S3',
        'PostgreSQL',
        'Docker',
        'Power BI',
      ],
    },
    {
      label: 'Data Science & Modeling',
      items: [
        'Feature Engineering',
        'Regression Analysis',
        'Random Forest',
        'XGBoost',
        'LightGBM',
        'PCA',
        'Bayesian Bootstrap',
        'Cross-validation',
        'Model Evaluation',
        'Uncertainty Analysis',
      ],
    },
    {
      label: 'Deep Learning & Computer Vision',
      items: [
        'PyTorch',
        'Pix2Pix / cGAN',
        'U-Net',
        'PatchGAN',
        'Transfer Learning',
        'OpenCV',
        'Image Augmentation',
        'FID / LPIPS',
        'Identity Similarity',
        'Gradio',
      ],
    },
  ];

  const intelWorkstreams = [
    {
      label: 'Data Engineering',
      title: 'Manufacturing ETL and downstream reporting automation',
      detail:
        'Built Python and SQLPathfinder ETL pipelines to extract heterogeneous chip-test logs, transform them into analysis-ready datasets, and load outputs into downstream reporting applications for repeatable first-cut engineering review.',
    },
    {
      label: 'Decision Support',
      title: 'On-hold product lot recommendation workflow',
      detail:
        'Co-developed a scheduled ETL-to-alert workflow that monitors live product-lot queues, cleans missing production fields, applies rule-based evaluation logic, and delivers release/review recommendations to engineering channels.',
    },
    {
      label: 'Data Science Validation',
      title: 'Alarm accuracy benchmarking for BLPCS',
      detail:
        'Compared trigger signals with actual chip failure outcomes, then produced confusion-matrix based accuracy baselines to quantify true alarms, false alarms, and threshold behavior.',
    },
    {
      label: 'Statistical Optimization',
      title: 'Spatial defect diagnostics and TACKOD noise reduction',
      detail:
        'Analyzed pocket/tray-level process patterns and pruned redundant correlated KPP combinations using regression and correlation checks to reduce noisy triggers and support root-cause isolation.',
    },
  ];

  const projects = [
    {
      title: 'Sketch-to-Image Face Synthesis',
      meta: 'Conditional GAN / Pix2Pix',
      summary:
        'Translated face sketches into photo-like portraits with Pix2Pix, U-Net generators, PatchGAN, transfer learning, ablation study, and Gradio deployment.',
      proof: ['FID 71.65', 'Identity cosine 0.8455', 'LPIPS down 15.2%'],
      href: '/projects/sketch-to-image-pix2pix',
      github: 'https://github.com/huyentranq/Sketch-to-Image-by-Pix2Pix',
    },
    {
      title: 'TMDB Movie Pipeline',
      meta: 'Lakehouse / Recommendation',
      summary:
        'Built an end-to-end movie data platform with ingestion, Spark processing, dbt models, PostgreSQL warehouse, and recommendation-serving outputs.',
      proof: ['1M+ records', 'Bronze/Silver/Gold', 'Star schema'],
      href: '/projects/movie-recommendation-system',
      github: 'https://github.com/huyentranq/TMDB-Pipeline-Recommendation',
    },
    {
      title: 'Streaming Data Pipeline',
      meta: 'Kafka / Spark Streaming',
      summary:
        'Designed a real-time sales data pipeline that moves events through Kafka, processes them with Spark, and prepares dashboard-ready analytical outputs.',
      proof: ['Streaming ingestion', 'Spark jobs', 'Power BI output'],
      href: '/projects/streaming-data-pipeline',
      github: 'https://github.com/huyentranq/Streaming-Data-pipeline',
    },
  ];

  return (
    <div className="bg-[#0b0f12] px-5 text-white sm:px-8 lg:px-12">
      <main className="mx-auto max-w-5xl">
        <motion.section
          id="about"
          variants={listReveal}
          initial="hidden"
          animate="visible"
          className="grid min-h-[72vh] gap-8 py-14 md:grid-cols-[1fr_180px] md:items-center"
        >
          <motion.div variants={reveal} className="max-w-3xl">
            <p className="text-[10px] font-normal text-[#84737c]">
              <span className="text-[#ff4fa3]">huyen@portfolio</span> : ~ $ whoami
            </p>
            <h1 className="portfolio-title mt-5 text-4xl font-black leading-tight text-white sm:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
              {profile.role}
            </p>
            <p className="mt-6 max-w-2xl text-[15px] leading-7 text-slate-700 dark:text-slate-300">
              I am passionate about turning complex, messy data into reliable systems and meaningful insights. I am pursuing a career in Data Engineering and Data Science, with a particular interest in building scalable pipelines, exploring patterns through rigorous analysis, and developing models that support real-world decisions. I enjoy understanding how data moves, what it reveals, and how thoughtful engineering can make it more trustworthy and useful.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-600 dark:text-slate-300">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-700 dark:text-teal-300" />
                {profile.location}
              </span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-teal-700 dark:hover:text-teal-300">
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-teal-700 dark:hover:text-teal-300">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-teal-700 dark:hover:text-teal-300">
                <Mail className="h-4 w-4" />
                Email
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">
                View projects
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:border-slate-500 dark:border-white/15 dark:text-white dark:hover:border-white/35">
                Contact
              </a>
            </div>
          </motion.div>

          <motion.div variants={reveal} className="md:justify-self-end">
            <img
              src="/images/avt2.jpg"
              alt={profile.name}
              className="h-32 w-32 object-cover grayscale-[20%] ring-1 ring-[#5b3045] md:h-40 md:w-40"
            />
          </motion.div>
        </motion.section>

        <Section id="education" eyebrow="Education" title="Academic foundation and credentials">
          <motion.div variants={listReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.div variants={reveal} className="flex gap-4">
              <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-teal-700 dark:text-teal-300" />
              <div>
                <h3 className="text-base font-bold text-slate-950 dark:text-white">VNU-HCM University of Science</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Bachelor of Data Science</p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Coursework includes Deep Learning, Machine Learning, Data Mining, Database Management, Fundamental Data Engineering, and Big Data.
                </p>
              </div>
            </motion.div>

            <motion.div variants={reveal} className="grid gap-3 sm:grid-cols-2">
              {certificates.map((cert) => (
                <div key={cert.title} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-700 dark:text-teal-300" />
                  <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                    <span className="font-semibold text-slate-950 dark:text-white">{cert.title}</span>{' '}
                    <span className="text-slate-500 dark:text-slate-400">({cert.issuer})</span>
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Section>

        <Section id="recognition" eyebrow="Recognition" title="Awards and competitions">
          <motion.div variants={listReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-5">
            {achievements.map(({ title, result, detail, icon: Icon }) => (
              <motion.div key={title} variants={reveal} className="flex gap-4">
                <Icon className="mt-1 h-4 w-4 shrink-0 text-rose-600 dark:text-rose-300" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{result}</p>
                  <h3 className="mt-1 text-base font-bold text-slate-950 dark:text-white">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600 dark:text-slate-300">{detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        <Section id="skills" eyebrow="Skills" title="Practical stack">
          <motion.div variants={listReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            {skills.map((group) => (
              <motion.div key={group.label} variants={reveal} className="grid gap-3 sm:grid-cols-[160px_1fr]">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-950 dark:text-white">
                  <Database className="h-4 w-4 text-teal-700 dark:text-teal-300" />
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-md border border-slate-200 px-2.5 py-1 text-xs text-slate-600 dark:border-white/10 dark:text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        <Section id="experience" eyebrow="Experience" title="Intel Products Vietnam">
          <motion.div variants={listReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.div variants={reveal}>
              <div className="flex items-start gap-4">
                <Briefcase className="mt-1 h-5 w-5 shrink-0 text-teal-700 dark:text-teal-300" />
                <div>
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">Data Engineering / Data Science Intern</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Nov 2025 - Present</p>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Applied data engineering and data science methods to manufacturing operations: automated data collection, standardized production reporting, validated alarm behavior, and translated statistical findings into engineering actions.
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="space-y-5 border-l border-slate-200 pl-5 dark:border-white/10">
              {intelWorkstreams.map((item) => (
                <motion.div key={item.title} variants={reveal} className="relative">
                  <span className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-teal-600 dark:bg-teal-300" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-700 dark:text-teal-300">{item.label}</p>
                  <h3 className="mt-1 text-base font-bold text-slate-950 dark:text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        <Section id="projects" eyebrow="Projects" title="Selected work">
          <motion.div variants={listReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-7">
            {projects.map((project) => (
              <motion.article key={project.title} variants={reveal} className="border-l border-slate-200 pl-5 dark:border-white/10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{project.meta}</p>
                <h3 className="mt-1.5 text-lg font-black text-slate-950 dark:text-white">{project.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{project.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.proof.map((item) => (
                    <span key={item} className="text-xs font-medium text-teal-700 dark:text-teal-300">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold">
                  <Link to={project.href} className="inline-flex items-center gap-1.5 text-rose-700 hover:text-rose-900 dark:text-rose-300 dark:hover:text-rose-100">
                    Detail
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
                    GitHub
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Section>

        <motion.section
          id="contact"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="border-t border-slate-200 py-12 dark:border-white/10"
        >
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-300">Contact</p>
            <h2 className="mt-3 text-2xl font-black text-slate-950 dark:text-white">
              Open to full-time roles, collaborations, and technical conversations.
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              {profile.email} · {profile.phone}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:border-slate-500 dark:border-white/15 dark:text-white dark:hover:border-white/35">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Home;
