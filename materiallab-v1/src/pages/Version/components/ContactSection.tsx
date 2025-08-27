import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  company: string;
  project: string;
  message: string;
}

interface ContactMethod {
  icon: string;
  title: string;
  description: string;
  action: string;
  href: string;
}

const contactMethods: ContactMethod[] = [
  {
    icon: '💬',
    title: 'Start a Conversation',
    description: 'Tell us about your vision. We love ambitious ideas.',
    action: 'Send a Message',
    href: '#contact-form'
  },
  {
    icon: '📅',
    title: 'Book a Discovery Call',
    description: '30 minutes to explore what\'s possible together.',
    action: 'Schedule Time',
    href: 'https://calendly.com/materiallab-discovery'
  },
  {
    icon: '🎨',
    title: 'Request a Prototype',
    description: 'See your idea come to life in 48 hours.',
    action: 'Start Prototyping',
    href: '#contact-form'
  }
];

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    project: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after a delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        project: '',
        message: ''
      });
    }, 3000);
  };

  const scrollToForm = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="contact" className="version-section contact-section">
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
            Let's Talk
          </motion.h2>
          <motion.p
            className="version-body section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
          >
            Every extraordinary collaboration begins with a simple conversation. 
            Whether you have a clear vision or just a spark of an idea, we'd love to hear from you.
          </motion.p>
        </div>

        {/* Contact Methods */}
        <div className="contact-methods">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              className="contact-method version-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1 + 0.3, 
                ease: [0.4, 0, 0.2, 1] 
              }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
            >
              <div className="method-icon">{method.icon}</div>
              <h3 className="method-title">{method.title}</h3>
              <p className="method-description">{method.description}</p>
              <button
                onClick={method.href.startsWith('#') ? scrollToForm : () => window.open(method.href, '_blank')}
                className="method-action version-btn"
              >
                {method.action}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          id="contact-form"
          className="contact-form-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
        >
          <div className="form-header">
            <h3>Tell Us About Your Vision</h3>
            <p>The more context you provide, the better we can understand how to help.</p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">What should we call you?</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Where can we reach you?</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company or Organization</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company name (optional)"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="project">Project Type</label>
                  <select
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select project type</option>
                    <option value="creative-tool">Creative Tool / Platform</option>
                    <option value="interactive-experience">Interactive Experience</option>
                    <option value="ai-integration">AI Integration</option>
                    <option value="prototype">Rapid Prototype</option>
                    <option value="consultation">Strategic Consultation</option>
                    <option value="other">Something Else Amazing</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">What's on your mind? Tell us anything.</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Share your vision, challenges, dreams, or questions. The more you tell us, the better we can help..."
                  required
                  rows={6}
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`version-btn version-btn-primary form-submit ${isSubmitting ? 'submitting' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Let's Begin</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 3L22 12L2 21L7 12L2 3Z" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          ) : (
            <motion.div
              className="form-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="success-icon">✨</div>
              <h3>Message received! We're excited to read it.</h3>
              <p>We'll be in touch within 24 hours to continue the conversation.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
        >
          <div className="info-grid">
            <div className="info-item">
              <h4>Response Time</h4>
              <p>We respond to all inquiries within 24 hours, usually much sooner.</p>
            </div>
            <div className="info-item">
              <h4>Discovery Process</h4>
              <p>Every project starts with a collaborative discovery session to align on vision and goals.</p>
            </div>
            <div className="info-item">
              <h4>Prototype First</h4>
              <p>We believe in showing, not just telling. Most engagements begin with a rapid prototype.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .contact-section {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.01) 0%,
            rgba(77, 166, 255, 0.02) 30%,
            rgba(82, 229, 183, 0.02) 70%,
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

        .contact-methods {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 5rem;
        }

        .contact-method {
          text-align: center;
          padding: 2.5rem 2rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .method-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .method-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .method-description {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .method-action {
          font-size: 0.95rem;
        }

        .contact-form-section {
          max-width: 800px;
          margin: 0 auto 4rem;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
          backdrop-filter: blur(20px);
        }

        .form-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .form-header h3 {
          font-size: 1.75rem;
          font-weight: 300;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .form-header p {
          color: var(--text-secondary);
          font-size: 1.125rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .form-input,
        .form-select,
        .form-textarea {
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.75rem;
          color: var(--text-primary);
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: rgba(77, 166, 255, 0.5);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 3px rgba(77, 166, 255, 0.1);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: var(--text-secondary);
          opacity: 0.7;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.5;
        }

        .form-submit {
          align-self: center;
          padding: 1.25rem 3rem;
          font-size: 1.125rem;
          font-weight: 600;
          margin-top: 1rem;
        }

        .form-submit.submitting {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .form-success {
          text-align: center;
          padding: 3rem 2rem;
        }

        .success-icon {
          font-size: 4rem;
          margin-bottom: 2rem;
        }

        .form-success h3 {
          font-size: 1.75rem;
          font-weight: 300;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .form-success p {
          font-size: 1.125rem;
          color: var(--text-secondary);
        }

        .contact-info {
          padding: 3rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
          backdrop-filter: blur(20px);
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .info-item {
          text-align: center;
        }

        .info-item h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .info-item p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .contact-methods {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .contact-form-section {
            padding: 2rem 1.5rem;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .contact-info {
            padding: 2rem 1.5rem;
          }

          .info-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};