import React from 'react';
import {
  Trophy,
  Medal,
  Award,
  AlignCenterVertical as Certificate,
} from 'lucide-react';

const Competitions: React.FC = () => {
  const competitions = [
    {
      icon: <Medal className="text-primary-accent" size={20} />,
      title: '2nd Place',
      event: 'SCUDEM IX (International Challenge on Differential Equations Modeling)',
      description: 'Mathematical modeling and computational problem solving',
    },
    {
      icon: <Award className="text-primary-accent" size={20} />,
      title: 'Honorable Award',
      event: 'MCM/ICM 2025 (International Mathematical Contest in Modeling)',
      description: 'Mathematical modeling competition with international recognition',
    },
    {
      icon: <Trophy className="text-primary-accent" size={20} />,
      title: 'Top 20',
      event: 'MDS Datathon Challenge',
      description: 'Advanced data analysis and machine learning competition',
    },
  ];

  const certificates = [
    {
      icon: <Certificate className="text-primary-accent" size={20} />,
      title: 'Advanced SQL Certificate',
      event: 'HackerRank',
      description: 'Demonstrated proficiency in complex SQL queries and database optimization',
    },
    {
      icon: <Certificate className="text-primary-accent" size={20} />,
      title: 'Fundamental Data Engineer Certification',
      event: 'Professional Certification',
      description: 'Core competencies in data engineering principles and practices',
    },
  ];

const renderItem = (item: any, index: number, total: number) => (
  <div className="relative pl-10 pb-6" key={index}>
    {/* Vertical line */}
    {index < total - 1 && (
      <span className="absolute left-5 top-6 h-full w-0.5 bg-white"></span>
    )}

    <div className="flex items-start gap-4">
      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center bg-primary-bg rounded-full z-10">
        {item.icon}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-primary-accent mb-1">
          {item.title}
        </h3>
        <h4 className="text-base font-semibold mb-2 text-primary-text">
          {item.event}
        </h4>
        <p className="text-gray-300 leading-relaxed text-sm">
          {item.description}
        </p>
      </div>
    </div>
  </div>
);


  return (
    <section id="competitions" className="py-5 bg-primary-section/20">
      <div className="section-container max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="text-primary-accent">Competitions</span> & Awards
        </h2>

        {/* Competitions list */}
        <div className="flex flex-col space-y-0">
          {competitions.map((item, index) => renderItem(item, index, competitions.length))}
        </div>

        {/* Spacing before certificates */}
        <div className="h-8" />

        {/* Certificates list */}
        <div className="flex flex-col space-y-0">
          {certificates.map((item, index) => renderItem(item, index, certificates.length))}
        </div>
      </div>
    </section>
  );
};

export default Competitions;
