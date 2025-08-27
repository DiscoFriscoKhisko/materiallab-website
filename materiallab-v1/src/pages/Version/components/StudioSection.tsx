import React from 'react';
import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  expertise: string;
  philosophy: string;
}

const team: TeamMember[] = [
  {
    name: "Alex Chen",
    role: "Creative Technologist",
    expertise: "AI-Human Interfaces",
    philosophy: "The best technology disappears into the experience."
  },
  {
    name: "Maya Patel", 
    role: "Generative Designer",
    expertise: "Computational Creativity",
    philosophy: "AI should amplify human imagination, not replace it."
  },
  {
    name: "Jordan Kim",
    role: "Interaction Engineer", 
    expertise: "Real-time Systems",
    philosophy: "Every millisecond matters in the dance between human and machine."
  },
  {
    name: "Sam Rodriguez",
    role: "Experience Architect",
    expertise: "Human-Centered AI",
    philosophy: "The most profound AI feels completely human."
  }
];

const values = [
  {
    icon: "🎭",
    title: "Playful Savant",
    description: "We combine deep technical expertise with an unshakeable sense of wonder. Serious about craft, playful in approach."
  },
  {
    icon: "🤝", 
    title: "Human-First AI",
    description: "Technology should enhance human capabilities, not diminish them. We build AI that makes people more creative, not less."
  },
  {
    icon: "🔬",
    title: "Experimental Rigor",
    description: "We prototype early, test constantly, and iterate relentlessly. Every assumption is validated through experience."
  },
  {
    icon: "🌟",
    title: "Engineered Delight", 
    description: "Delight isn't accidental—it's carefully crafted through attention to detail, thoughtful interaction, and genuine care."
  }
];

export const StudioSection: React.FC = () => {
  return (
    <section id="studio" className="version-section studio-section">
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
            The Studio
          </motion.h2>
          <motion.p
            className="version-body section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
          >
            We're a collective of creators, engineers, and dreamers united by a simple belief: 
            the future of AI isn't about replacing human creativity—it's about amplifying it.
          </motion.p>
        </div>

        {/* Philosophy Section */}
        <motion.div
          className="philosophy-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
        >
          <div className="philosophy-content">
            <h3 className="philosophy-title">Our Manifesto</h3>
            <div className="manifesto-text">
              <p>
                <strong>We believe in the un-boring of AI.</strong> While others build black boxes that feel cold and distant, 
                we craft experiences that feel warm, intuitive, and surprisingly human.
              </p>
              <p>
                <strong>We believe in symbiosis over replacement.</strong> The future isn't human vs. machine—it's human 
                with machine, each amplifying what the other does best.
              </p>
              <p>
                <strong>We believe creativity cannot be commanded.</strong> It must be coaxed, nurtured, and invited to play. 
                Our tools don't demand compliance; they spark inspiration.
              </p>
            </div>
          </div>
          
          <div className="philosophy-visual">
            <div className="visual-element spark">✨</div>
            <div className="visual-element heart">❤️</div>
            <div className="visual-element gear">⚙️</div>
            <div className="connecting-line line-1" />
            <div className="connecting-line line-2" />
          </div>
        </motion.div>

        {/* Values Grid */}
        <div className="values-section">
          <motion.h3
            className="values-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
          >
            What Drives Us
          </motion.h3>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="value-card version-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1, 
                  ease: [0.4, 0, 0.2, 1] 
                }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="value-icon">{value.icon}</div>
                <h4 className="value-title">{value.title}</h4>
                <p className="value-description">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <motion.h3
            className="team-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
          >
            The Humans Behind the Magic
          </motion.h3>
          
          <div className="team-grid">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="team-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15, 
                  ease: [0.4, 0, 0.2, 1] 
                }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
              >
                <div className="member-avatar">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="member-info">
                  <h4 className="member-name">{member.name}</h4>
                  <p className="member-role">{member.role}</p>
                  <p className="member-expertise">{member.expertise}</p>
                  <blockquote className="member-philosophy">
                    "{member.philosophy}"
                  </blockquote>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <motion.div
          className="process-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
        >
          <h3 className="process-title">How We Work</h3>
          <div className="process-content">
            <div className="process-text">
              <p>
                <strong>Show the Seams:</strong> We believe in radical transparency. You'll see our process, 
                our failures, our breakthroughs. No black boxes, no magic tricks—just honest collaboration.
              </p>
              <p>
                <strong>Prototype Everything:</strong> Words are cheap. We build working demos within days, 
                not months. Feel the experience before committing to the vision.
              </p>
              <p>
                <strong>Iterate with Intent:</strong> Every change has purpose. We test, measure, learn, and 
                improve with scientific rigor wrapped in creative intuition.
              </p>
            </div>
            <div className="process-stats">
              <div className="stat">
                <div className="stat-number">48hrs</div>
                <div className="stat-label">To First Prototype</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Transparent Process</div>
              </div>
              <div className="stat">
                <div className="stat-number">∞</div>
                <div className="stat-label">Curiosity Level</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .studio-section {
          background: linear-gradient(
            180deg,
            rgba(184, 164, 227, 0.02) 0%,
            rgba(255, 255, 255, 0.01) 50%,
            rgba(82, 229, 183, 0.02) 100%
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

        .philosophy-section {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
          align-items: center;
          margin-bottom: 5rem;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
          backdrop-filter: blur(20px);
        }

        .philosophy-title {
          font-size: 2rem;
          font-weight: 300;
          color: var(--text-primary);
          margin-bottom: 2rem;
        }

        .manifesto-text p {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .manifesto-text strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .philosophy-visual {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
          padding: 2rem;
        }

        .visual-element {
          font-size: 3rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .connecting-line {
          position: absolute;
          width: 2px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.3), transparent);
        }

        .line-1 {
          top: 25%;
        }

        .line-2 {
          top: 58%;
        }

        .values-section {
          margin: 5rem 0;
        }

        .values-title {
          font-size: 2rem;
          font-weight: 300;
          color: var(--text-primary);
          text-align: center;
          margin-bottom: 3rem;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .value-card {
          text-align: center;
          padding: 2.5rem 2rem;
        }

        .value-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .value-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .value-description {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .team-section {
          margin: 5rem 0;
        }

        .team-title {
          font-size: 2rem;
          font-weight: 300;
          color: var(--text-primary);
          text-align: center;
          margin-bottom: 3rem;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .team-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          padding: 2rem;
          backdrop-filter: blur(20px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
        }

        .team-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 16px 64px rgba(0, 0, 0, 0.1);
        }

        .member-avatar {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #4DA6FF, #52E5B7);
          color: #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 auto 1.5rem;
        }

        .member-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .member-role {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .member-expertise {
          font-size: 0.875rem;
          color: var(--text-secondary);
          opacity: 0.8;
          margin-bottom: 1.5rem;
        }

        .member-philosophy {
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-style: italic;
          line-height: 1.5;
          margin: 0;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 0.75rem;
          border-left: 3px solid rgba(77, 166, 255, 0.5);
        }

        .process-section {
          margin: 5rem 0;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
          backdrop-filter: blur(20px);
        }

        .process-title {
          font-size: 2rem;
          font-weight: 300;
          color: var(--text-primary);
          text-align: center;
          margin-bottom: 3rem;
        }

        .process-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .process-text p {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .process-text strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .process-stats {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .stat {
          text-align: center;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 300;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (max-width: 768px) {
          .philosophy-section,
          .process-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .philosophy-visual {
            order: -1;
            flex-direction: row;
            justify-content: space-around;
            gap: 1rem;
          }

          .visual-element {
            width: 60px;
            height: 60px;
            font-size: 2rem;
          }

          .connecting-line {
            display: none;
          }

          .values-grid,
          .team-grid {
            grid-template-columns: 1fr;
          }

          .process-stats {
            flex-direction: row;
          }
        }
      `}</style>
    </section>
  );
};