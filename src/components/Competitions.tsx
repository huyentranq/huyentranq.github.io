import React from 'react';
import { Trophy, Medal, Award, AlignCenterVertical as Certificate } from 'lucide-react';

const Competitions: React.FC = () => {
  const achievements = [
    {
      icon: <Trophy className="text-primary-accent" size={24} />,
      title: "Top 20",
      event: "MDS Datathon Challenge",
      description: "Advanced data analysis and machine learning competition"
    },
    {
      icon: <Medal className="text-primary-accent\" size={24} />,
      title: "2nd Place",
      event: "SCUDEM IX (International Challenge on Differential Equations Modeling)",
      description: "Mathematical modeling and computational problem solving"
    },
    {
      icon: <Award className="text-primary-accent" size={24} />,
      title: "Honorable Award",
      event: "MCM/ICM 2025 (International Mathematical Contest in Modeling)",
      description: "Mathematical modeling competition with international recognition"
    },
    {
      icon: <Certificate className="text-primary-accent\" size={24} />,
      title: "Advanced SQL Certificate",
      event: "HackerRank",
      description: "Demonstrated proficiency in complex SQL queries and database optimization"
    },
    {
      icon: <Certificate className="text-primary-accent" size={24} />,
      title: "Fundamental Data Engineer Certification",
      event: "Professional Certification",
      description: "Core competencies in data engineering principles and practices"
    }
  ];

  return (
    <section id="competitions" className="py-16 bg-primary-section/20">
      <div className="section-container">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="text-primary-accent">Competitions</span> & Awards
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="section-bg p-6 card-hover animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-primary-bg rounded-lg">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-primary-accent mb-1">
                    {achievement.title}
                  </h3>
                  <h4 className="text-base font-semibold mb-2 text-primary-text">
                    {achievement.event}
                  </h4>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Competitions;