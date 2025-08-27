import React from 'react';
import { motion } from 'framer-motion';

interface Service {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  persona: 'anya' | 'david';
}

const services: Service[] = [
  {
    icon: '🎨',
    title: 'Creative Augmentation',
    subtitle: 'For the Visionary Creator',
    description: 'Transform your creative process with AI that understands nuance, context, and artistic intent. Not replacement—amplification.',
    features: [
      'Generative design tools that respond to your aesthetic',
      'Real-time creative collaboration with AI',
      'Infinite variation with perfect brand consistency',
      'Interactive prototypes that feel alive'
    ],
    persona: 'anya'
  },
  {
    icon: '⚡',
    title: 'Innovation Acceleration',
    subtitle: 'For the Strategic Innovator',
    description: 'Turn ambitious ideas into interactive realities. We build the impossible, test the untested, and launch the unforgettable.',
    features: [
      'Rapid prototyping of complex interactions',
      'AI-powered user experience optimization',
      'Scalable architecture for growth',
      'Measurable impact on key business metrics'
    ],
    persona: 'david'
  },
  {
    icon: '🧬',
    title: 'Symbiotic Systems',
    subtitle: 'For the Collaborative Future',
    description: 'Where human intuition meets artificial intelligence. We craft seamless partnerships between people and machines.',
    features: [
      'Human-centered AI interface design',
      'Adaptive systems that learn and evolve',
      'Ethical AI implementation frameworks',
      'Future-proof technological foundations'
    ],
    persona: 'david'
  }
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="version-section services-section">
      <div className="version-container">
        {/* Section Header */}
        <div className="section-header">
          <motion.h2
            className="version-headline"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
          >
            What We Imagine
          </motion.h2>
          <motion.p
            className="version-body section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
          >
            We don't just build software. We architect experiences that bridge the gap between human creativity 
            and artificial intelligence, creating tools that feel more like magic than technology.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={`service-card version-card ${service.persona}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2, 
                ease: [0.4, 0, 0.2, 1] 
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="service-icon">{service.icon}</div>
              
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <h4 className="service-subtitle">{service.subtitle}</h4>
                <p className="service-description">{service.description}</p>
                
                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: (index * 0.2) + (featureIndex * 0.1) + 0.3 
                      }}
                      viewport={{ once: true }}
                    >
                      <span className="feature-bullet">→</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className={`persona-indicator ${service.persona}`}>
                {service.persona === 'anya' ? 'For Creatives' : 'For Innovators'}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Methodology Section */}
        <motion.div
          className="methodology-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
        >
          <h3 className="methodology-title">Our Approach: Engineered Delight</h3>
          <div className="methodology-grid">
            <div className="methodology-step">
              <div className="step-number">01</div>
              <h4>Listen Deeply</h4>
              <p>We don't just hear requirements—we uncover dreams, frustrations, and hidden potentials.</p>
            </div>
            <div className="methodology-step">
              <div className="step-number">02</div>
              <h4>Prototype Rapidly</h4>
              <p>Ideas become tangible within days. Feel the magic before committing to the vision.</p>
            </div>
            <div className="methodology-step">
              <div className="step-number">03</div>
              <h4>Iterate Constantly</h4>
              <p>Perfection emerges through collaboration, testing, and relentless refinement.</p>
            </div>
            <div className="methodology-step">
              <div className="step-number">04</div>
              <h4>Launch Boldly</h4>
              <p>Ship experiences that don't just work—they inspire, delight, and transform.</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="services-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
        >
          <h3>Ready to build something extraordinary?</h3>
          <p>Every great collaboration starts with a conversation.</p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="version-btn version-btn-primary"
          >
            Start the Conversation
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        .services-section {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.01) 0%,
            rgba(77, 166, 255, 0.02) 50%,
            rgba(255, 255, 255, 0.01) 100%
          );
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-subtitle {
          max-width: 700px;
          margin: 0 auto;
          font-size: 1.125rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 5rem;
        }

        .service-card {
          position: relative;
          min-height: 400px;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .service-card.anya {
          border-left: 3px solid #FF6B5D;
        }

        .service-card.david {
          border-left: 3px solid #4DA6FF;
        }

        .service-icon {
          font-size: 3rem;
          margin-bottom: 2rem;
          display: flex;
          justify-content: center;
        }

        .service-content {
          flex: 1;
        }

        .service-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .service-subtitle {
          font-size: 1rem;
          font-weight: 400;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          opacity: 0.8;
        }

        .service-description {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .service-features {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .service-features li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 1rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .feature-bullet {
          color: var(--text-primary);
          font-weight: 600;
          margin-top: 0.1rem;
          flex-shrink: 0;
        }

        .persona-indicator {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .persona-indicator.anya {
          background: rgba(255, 107, 93, 0.2);
          color: #FF6B5D;
          border: 1px solid rgba(255, 107, 93, 0.3);
        }

        .persona-indicator.david {
          background: rgba(77, 166, 255, 0.2);
          color: #4DA6FF;
          border: 1px solid rgba(77, 166, 255, 0.3);
        }

        .methodology-section {
          margin: 5rem 0;
          padding: 3rem 0;
          text-align: center;
        }

        .methodology-title {
          font-size: 2rem;
          font-weight: 300;
          color: var(--text-primary);
          margin-bottom: 3rem;
        }

        .methodology-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .methodology-step {
          text-align: center;
          padding: 2rem 1rem;
        }

        .step-number {
          display: inline-block;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #4DA6FF, #52E5B7);
          color: #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 auto 1.5rem;
        }

        .methodology-step h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .methodology-step p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .services-cta {
          text-align: center;
          padding: 3rem 2rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
          backdrop-filter: blur(20px);
        }

        .services-cta h3 {
          font-size: 1.75rem;
          font-weight: 300;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .services-cta p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .service-card {
            min-height: auto;
          }

          .methodology-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .methodology-step {
            padding: 1.5rem 1rem;
          }

          .services-cta {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};