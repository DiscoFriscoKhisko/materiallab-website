import { Layout } from '../../components/Layout/Layout';
import { MLText, MLHeading } from '../../components/ML';
import { Button as VeoButton } from '../../components/UI';
import { VeoArrowRightIcon } from '../../components/VeoIcon';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Strategic Sprint",
      description: "Know if technology solves your problem—with working code to prove it.",
      features: [
        "Working prototype in your hands",
        "Technical roadmap with clear steps",
        "Clear go/no-go recommendation", 
        "Understanding of real costs and timeline"
      ],
      price: "Fixed investment"
    },
    {
      title: "Product Development",
      description: "From validated idea to production software your customers can use.",
      features: [
        "Live product customers can access",
        "Clean, maintainable codebase",
        "Complete documentation and handoff", 
        "Your team owns everything"
      ],
      price: "Transparent pricing"
    },
    {
      title: "Business Automation",
      description: "Turn repetitive tasks into automated workflows. Get your time back.",
      features: [
        "Hours saved weekly, measurably",
        "Elegant integration with existing tools",
        "Team training and documentation",
        "Ongoing optimization support"
      ],
      price: "ROI-based approach"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Deep Listening",
      description: "We understand your business model, customer pain points, and constraints. No generic discovery decks."
    },
    {
      step: "02", 
      title: "Rapid Validation",
      description: "See your core idea working. Real code, real functionality, real feedback opportunity."
    },
    {
      step: "03",
      title: "Collaborative Building",
      description: "Regular check-ins and demos. You guide priorities, we handle execution."
    },
    {
      step: "04",
      title: "Full Ownership",
      description: "Your team owns the code. We ensure you're confident running and modifying it."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MLHeading level={1} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8">
              How We Work: Fast, Focused, Together
            </MLHeading>
            <MLText variant="bodyL" className="text-lg md:text-xl text-text-weak max-w-2xl mx-auto leading-relaxed">
              True partnership means working together, not working for you. Here's how we approach every project.
            </MLText>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-20 bg-surface-1">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <MLHeading level={2} className="text-4xl font-semibold mb-6">
              Our Services
            </MLHeading>
            <MLText variant="bodyL" className="text-xl text-text-weak max-w-2xl mx-auto">
              From strategy to deployment, we handle every aspect of AI product development
            </MLText>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl p-6 md:p-8 shadow-elevation-2 hover:shadow-elevation-4 transition-all duration-300 border border-white/5 hover:border-white/10"
              >
                <MLHeading level={3} className="text-xl md:text-2xl font-semibold mb-4">
                  {service.title}
                </MLHeading>
                <MLText variant="body" className="text-text-weak leading-relaxed mb-6">
                  {service.description}
                </MLText>
                
                <div className="mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center mb-3">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      <MLText variant="body" className="text-text">
                        {feature}
                      </MLText>
                    </div>
                  ))}
                </div>

                <div className="border-t border-outline pt-6">
                  <MLText variant="body" className="text-text-weak mb-4">
                    {service.price}
                  </MLText>
                  <VeoButton
                    variant="primary"
                    onClick={() => navigate('/contact')}
                    className="w-full font-semibold shadow-elevation-1 hover:shadow-elevation-2"
                  >
                    Get Started
                  </VeoButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <MLHeading level={2} className="text-4xl font-semibold mb-6">
              How We Work
            </MLHeading>
            <MLText variant="bodyL" className="text-xl text-text-weak max-w-2xl mx-auto">
              Our proven process for delivering successful AI products
            </MLText>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center text-lg font-bold mb-6 mx-auto">
                  {step.step}
                </div>
                <MLHeading level={3} className="text-xl font-semibold mb-4">
                  {step.title}
                </MLHeading>
                <MLText variant="body" className="text-text-weak leading-relaxed">
                  {step.description}
                </MLText>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-surface-1">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <MLHeading level={2} className="text-4xl font-semibold mb-8">
            Ready to start your AI project?
          </MLHeading>
          <MLText variant="bodyL" className="text-xl text-text-weak mb-12 max-w-2xl mx-auto">
            Let's discuss your goals and explore how we can help bring your AI vision to life.
          </MLText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <VeoButton
              variant="primary"
              size="lg"
              onClick={() => navigate('/contact')}
              icon={<VeoArrowRightIcon />}
              iconPosition="right"
              className="px-8 py-4 text-lg font-semibold shadow-elevation-2 hover:shadow-elevation-3 hover:scale-105 transition-all duration-200"
            >
              Start a Project
            </VeoButton>
            <VeoButton
              variant="outline"
              size="lg"
              onClick={() => navigate('/work')}
              className="px-8 py-4 text-lg"
            >
              View Our Work
            </VeoButton>
          </div>
        </div>
      </section>
    </Layout>
  );
};