import React from 'react';
import { Database, Code, TrendingUp, Linkedin, Github, Mail, Phone } from 'lucide-react';

const Hero: React.FC = () => {
  const contactInfo = [
    {
      icon: <Linkedin size={18} />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/trang-nguyen-huyen-674109249/"
    },
    {
      icon: <Github size={18} />,
      label: "GitHub", 
      href: "https://github.com/huyentranq"
    },
    {
      icon: <Mail size={18} />,
      label: "nguyenhuyentrangg457@gmail.com",
      href: "mailto:nguyenhuyentrangg457@gmail.com"
    },
    {
      icon: <Phone size={18} />,
      label: "+84 457 4767",
      href: "tel:+84457457767"
    }
  ];

  return (
    <section id="home" className="py-16 mt-12">
      <div className="section-container">
        <div className="section-bg p-8 animate-slide-up">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Hello, I'm{' '}
                <span className="text-primary-accent">Huyen Trang</span>
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-300">
                Aspiring Data Engineer
              </h3>
              <p className="text-base leading-relaxed mb-6 text-gray-300">
                Passionate about data pipeline design, ETL/ELT architecture, and real-time data streaming.
                Experienced with Linux, Spark, dbt, SQL, MinIO.
                Constantly learning and contributing to open-source and volunteer projects.
              </p>
              
              {/* Contact Information */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 text-primary-accent">Get In Touch</h4>
                <div className="grid grid-cols-2 gap-3">
                  {contactInfo.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.href}
                      className="flex items-center gap-2 p-2 bg-primary-bg rounded-lg hover:bg-primary-accent hover:text-primary-bg transition-all duration-300 group text-sm"
                      target={contact.label === 'LinkedIn' || contact.label === 'GitHub' ? '_blank' : '_self'}
                      rel={contact.label === 'LinkedIn' || contact.label === 'GitHub' ? 'noopener noreferrer' : ''}
                    >
                      <div className="text-primary-accent group-hover:text-primary-bg transition-colors">
                        {contact.icon}
                      </div>
                      <span className="text-xs">{contact.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="flex items-center gap-2 px-3 py-2 bg-primary-bg rounded-lg text-sm">
                  <Database size={14} className="text-primary-accent" />
                  <span>Data Engineering</span>
                </span>
                <span className="flex items-center gap-2 px-3 py-2 bg-primary-bg rounded-lg text-sm">
                  <Code size={14} className="text-primary-accent" />
                  <span>ETL/ELT</span>
                </span>
                <span className="flex items-center gap-2 px-3 py-2 bg-primary-bg rounded-lg text-sm">
                  <TrendingUp size={14} className="text-primary-accent" />
                  <span>Real-time Streaming</span>
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary-accent to-yellow-600 p-1 animate-bounce-gentle">
                  <img
                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Huyen Trang Profile"
                    className="w-full h-full rounded-full object-cover border-3 border-primary-section"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-primary-accent rounded-full flex items-center justify-center">
                  <Database size={20} className="text-primary-bg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;