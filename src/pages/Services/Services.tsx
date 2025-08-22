import { Layout } from '../../components/Layout/Layout';
import { MLSectionTitle, MLText, MLHeading } from '../../components/ML';
import { VeoButton, VeoArrowIcon } from '../../components/VeoButton';
import { ContactSplit } from '../../components/ContactCTA';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const Services = () => {
  const navigate = useNavigate();
  const heroRef = useScrollAnimation({ threshold: 0.2 });
  const processRef = useScrollAnimation({ threshold: 0.3 });
  const capabilitiesRef = useScrollAnimation({ threshold: 0.3 });

  const capabilities = [
    {
      title: "Product Strategy",
      description: "We help define your product vision, identify market opportunities, and create roadmaps that align with your business goals.",
      features: ["Market research", "User journey mapping", "Feature prioritization", "MVP planning"]
    },
    {
      title: "Design & Development",
      description: "From wireframes to fully functional products, we build with modern technologies and design principles.",
      features: ["UI/UX design", "Frontend development", "Backend systems", "API integration"]
    },
    {
      title: "Automation Solutions",
      description: "Custom tools and workflows that eliminate repetitive tasks and streamline your operations.",
      features: ["Process automation", "Custom integrations", "Data processing", "Workflow optimization"]
    },
    {
      title: "Launch Support",
      description: "We don't just build and disappear. We support your product launch and help you scale successfully.",
      features: ["Testing & QA", "Deployment", "Performance monitoring", "User feedback analysis"]
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "We start by understanding your business, users, and goals through detailed discovery sessions."
    },
    {
      step: "02", 
      title: "Strategy",
      description: "Based on our findings, we create a clear product strategy and development roadmap."
    },
    {
      step: "03",
      title: "Build",
      description: "Our team designs and develops your product with regular check-ins and feedback cycles."
    },
    {
      step: "04",
      title: "Launch",
      description: "We support you through launch and provide ongoing optimization based on real user data."
    }
  ];

  return (
    <Layout>
      <div className="relative overflow-hidden bg-background">
        {/* Hero Section */}
        <section ref={heroRef.ref} className="scene-module">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <MLText variant="display" as="h1" className="mb-6 heading-spacing-tight">
                What We Do
              </MLText>
              
              <MLText variant="body" color="weak" className="mb-12 max-line-length mx-auto paragraph-spacing">
                We transform ambitious ideas into market-leading products through strategic thinking, 
                cutting-edge design, and robust development. Your vision, our execution.
              </MLText>

              <VeoButton
                variant="primary"
                size="lg"
                onClick={() => navigate('/contact')}
                icon={<VeoArrowIcon />}
                iconPosition="right"
              >
                Start Your Journey
              </VeoButton>
            </motion.div>
          </div>
        </section>

        {/* Our Process */}
        <section ref={processRef.ref} className="scene-module bg-surface/30">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={processRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <MLSectionTitle
                variant="headline"
                align="center"
                animate={true}
                subtitle="A proven approach that gets results"
                className="mb-8"
              >
                How we work
              </MLSectionTitle>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {process.map((item, index) => (
                <motion.div
                  key={item.step}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <MLText variant="bodyM" className="text-text-inverse font-bold">
                      {item.step}
                    </MLText>
                  </div>
                  <MLHeading level={4} className="mb-4">
                    {item.title}
                  </MLHeading>
                  <MLText variant="bodyS" color="weak">
                    {item.description}
                  </MLText>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section ref={capabilitiesRef.ref} className="scene-module">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={capabilitiesRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <MLSectionTitle
                variant="headline"
                align="center"
                animate={true}
                subtitle="Everything you need to build successful products"
                className="mb-8"
              >
                What we deliver
              </MLSectionTitle>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={capability.title}
                  className="p-veo-6 rounded-veo-2xl bg-surface-1 border border-outline-variant hover:border-primary/20 transition-colors duration-veo-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <MLHeading level={3} className="mb-4">
                    {capability.title}
                  </MLHeading>
                  <MLText variant="body" color="weak" className="mb-6">
                    {capability.description}
                  </MLText>
                  <div className="grid grid-cols-2 gap-3">
                    {capability.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <MLText variant="bodyS" color="text">
                          {feature}
                        </MLText>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <VeoButton
                variant="outline"
                onClick={() => navigate('/work')}
                icon={<VeoArrowIcon />}
                iconPosition="right"
              >
                See our work
              </VeoButton>
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <ContactSplit
          whatsappNumber="+14155551234"
          onFormSubmit={(data) => {
            console.log('Form submitted:', data);
          }}
          className="bg-surface-1"
        />
      </div>
    </Layout>
  );
};