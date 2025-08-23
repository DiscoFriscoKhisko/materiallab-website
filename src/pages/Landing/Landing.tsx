import { Layout } from '../../components/Layout/Layout';
import { MLText, MLHeading } from '../../components/ML';
import { Button as VeoButton } from '../../components/UI';
import { VeoArrowRightIcon } from '../../components/VeoIcon';
import { VeoStyleHero } from '../../components/VeoStyleHero';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      {/* Hero Section - Veo Style with Interactive Elements */}
      <VeoStyleHero
        title="AI Product Studio"
        subtitle="Turn your ideas into production-ready AI applications. From concept to deployment, we build the future with you."
        primaryCta={{
          text: "See Our Work",
          path: "/work"
        }}
        secondaryCta={{
          text: "Start Building",
          path: "/contact"
        }}
      />

      {/* Services Overview - Veo Style Cards */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-veo text-4xl md:text-5xl font-medium text-gray-900 mb-6">
              What We Build
            </h2>
            <p className="font-veo text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              End-to-end AI product development with a focus on user experience and business impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Strategy & Consulting",
                description: "Define your AI roadmap and identify the highest-impact opportunities for your business.",
                icon: "🎯",
                metrics: "2-week roadmap"
              },
              {
                title: "Product Development", 
                description: "Build production-ready AI applications with modern frameworks and best practices.",
                icon: "⚡",
                metrics: "8-week MVP"
              },
              {
                title: "Team Augmentation",
                description: "Scale your team with experienced AI engineers and product specialists.",
                icon: "🚀",
                metrics: "Senior talent"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 cursor-pointer hover:border-primary-container transition-all duration-300"
              >
                <div className="text-4xl mb-6">{service.icon}</div>
                <h3 className="font-veo text-2xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="font-veo text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="bg-primary-container text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {service.metrics}
                  </span>
                  <span className="text-primary hover:text-primary-hover font-medium text-sm transition-colors">
                    Learn more →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Veo Style */}
      <section className="py-32 bg-primary-container">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Stats */}
            <motion.div
              className="flex justify-center items-center space-x-12 mb-12"
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
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl font-veo font-bold text-primary">{stat.number}</div>
                  <div className="text-sm font-veo text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <h2 className="font-veo text-4xl md:text-5xl font-medium text-gray-900 mb-8">
              Ready to build something great?
            </h2>
            <p className="font-veo text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Let's discuss your project and explore how we can help bring your AI vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <VeoButton
                variant="filled"
                size="lg"
                onClick={() => navigate('/contact')}
                className="bg-primary text-white hover:bg-primary-hover px-8 py-4 text-lg font-veo font-medium transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Start the Conversation
              </VeoButton>
              <VeoButton
                variant="outlined"
                size="lg"
                onClick={() => navigate('/veo')}
                className="border-primary text-primary hover:bg-white px-8 py-4 text-lg font-veo font-medium transition-all duration-300 hover:scale-105"
              >
                Try Interactive Demo
              </VeoButton>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};