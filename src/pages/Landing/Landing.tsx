import { Layout } from '../../components/Layout/Layout';
import { MLText, MLHeading } from '../../components/ML';
import { Button as VeoButton } from '../../components/UI';
import { VeoArrowRightIcon } from '../../components/VeoIcon';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      {/* Hero Section - Clean & Focused */}
      <section className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MLHeading 
              level={1} 
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 tracking-tight"
            >
              AI Product Studio
            </MLHeading>
            <MLText 
              variant="bodyL" 
              className="text-xl md:text-2xl text-text-weak mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              We build AI-powered products that solve real problems. 
              From concept to deployment, we're your technical partner.
            </MLText>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <VeoButton
                variant="primary"
                size="lg"
                onClick={() => navigate('/what-we-do')}
                className="px-8 py-4 text-lg"
              >
                Explore Our Work
              </VeoButton>
              <VeoButton
                variant="outline"
                size="lg"
                onClick={() => navigate('/contact')}
                className="px-8 py-4 text-lg"
              >
                Start a Project
              </VeoButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview - Minimal Cards */}
      <section className="py-32 bg-surface-1">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <MLHeading level={2} className="text-4xl md:text-5xl font-display font-semibold mb-6">
              What We Do
            </MLHeading>
            <MLText variant="bodyL" className="text-xl text-text-weak max-w-2xl mx-auto">
              End-to-end AI product development with a focus on user experience and business impact.
            </MLText>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "AI Strategy",
                description: "Define your AI roadmap and identify the highest-impact opportunities for your business."
              },
              {
                title: "Product Development", 
                description: "Build production-ready AI applications with modern frameworks and best practices."
              },
              {
                title: "Team Augmentation",
                description: "Scale your team with experienced AI engineers and product specialists."
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8"
              >
                <MLHeading level={3} className="text-2xl font-semibold mb-4">
                  {service.title}
                </MLHeading>
                <MLText variant="body" className="text-text-weak leading-relaxed">
                  {service.description}
                </MLText>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Simple & Direct */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <MLHeading level={2} className="text-4xl md:text-5xl font-display font-semibold mb-8">
              Ready to build something great?
            </MLHeading>
            <MLText variant="bodyL" className="text-xl text-text-weak mb-12 max-w-2xl mx-auto">
              Let's discuss your project and explore how we can help bring your AI vision to life.
            </MLText>
            <VeoButton
              variant="primary"
              size="lg"
              onClick={() => navigate('/contact')}
              icon={<VeoArrowRightIcon />}
              iconPosition="right"
              className="px-8 py-4 text-lg"
            >
              Start the Conversation
            </VeoButton>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};