import { Layout } from '../../components/Layout/Layout';
import { Typography, Button, Card, Hero } from '../../components/LSS';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      {/* Hero Section - LSS Design System */}
      <Hero
        title="Software that creates material impact"
        subtitle="We partner with growing businesses to build technology that matters. Real products, real results."
        primaryAction={{
          text: "View Our Work",
          onClick: () => navigate('/work')
        }}
        secondaryAction={{
          text: "Start a Conversation",
          onClick: () => navigate('/contact')
        }}
        className="lss-landing-hero"
      />

      {/* Services Overview - LSS Cards */}
      <section className="lss-services-section">
        <div className="lss-container">
          <motion.div 
            className="lss-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="display-1" as="h2" className="lss-section-title">
              How We Help
            </Typography>
            <Typography variant="body-lg" className="lss-section-description">
              We listen deeply, build quickly, and iterate constantly. Real partnership, real results.
            </Typography>
          </motion.div>

          <div className="lss-services-grid">
            {[
              {
                title: "Strategic Sprint",
                description: "Know if technology solves your problem—with working code to prove it.",
                icon: "🎯",
                metrics: "Prototype + roadmap"
              },
              {
                title: "Product Development", 
                description: "From validated idea to production software your customers can use.",
                icon: "⚡",
                metrics: "Live product"
              },
              {
                title: "Business Automation",
                description: "Turn repetitive tasks into automated workflows. Get your time back.",
                icon: "🚀",
                metrics: "Hours saved weekly"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card variant="glass" className="lss-service-card">
                  <div className="lss-service-icon">{service.icon}</div>
                  <Typography variant="h3" className="lss-service-title">
                    {service.title}
                  </Typography>
                  <Typography variant="body" className="lss-service-description">
                    {service.description}
                  </Typography>
                  <div className="lss-service-footer">
                    <span className="lss-service-metric">{service.metrics}</span>
                    <span className="lss-service-link">Learn more →</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - LSS Style */}
      <section className="lss-cta-section">
        <div className="lss-container lss-text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lss-cta-content"
          >
            {/* Stats */}
            <motion.div
              className="lss-stats-grid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {[
                { number: '50+', label: 'Projects Delivered' },
                { number: '2 weeks', label: 'Average MVP Time' },
                { number: '98%', label: 'Client Satisfaction' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="lss-stat-item"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Typography variant="display-3" className="lss-stat-number">
                    {stat.number}
                  </Typography>
                  <Typography variant="caption" className="lss-stat-label">
                    {stat.label}
                  </Typography>
                </motion.div>
              ))}
            </motion.div>

            <Typography variant="display-1" as="h2" className="lss-cta-title">
              Ready to build something great?
            </Typography>
            <Typography variant="body-lg" className="lss-cta-description">
              Let's discuss your project and explore how we can help bring your AI vision to life.
            </Typography>
            
            <div className="lss-cta-actions">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/contact')}
              >
                Start the Conversation
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/veo')}
              >
                Try Interactive Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};