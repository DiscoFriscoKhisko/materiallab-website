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
      title: "AI Strategy & Consulting",
      description: "Define your AI roadmap and identify the highest-impact opportunities for your business.",
      features: [
        "AI opportunity assessment",
        "Technical feasibility analysis", 
        "ROI modeling and planning",
        "Implementation roadmap"
      ],
      price: "Starting at $15k"
    },
    {
      title: "AI Product Development",
      description: "Build production-ready AI applications with modern frameworks and best practices.",
      features: [
        "Full-stack AI applications",
        "Machine learning model development",
        "API design and integration", 
        "Cloud deployment and scaling"
      ],
      price: "Starting at $50k"
    },
    {
      title: "Team Augmentation",
      description: "Scale your team with experienced AI engineers and product specialists.",
      features: [
        "Senior ML engineers",
        "AI product managers",
        "Technical leadership",
        "Knowledge transfer"
      ],
      price: "From $8k/month"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "We understand your business goals, technical constraints, and success criteria."
    },
    {
      step: "02", 
      title: "Strategy",
      description: "Define the AI solution architecture and implementation approach that fits your needs."
    },
    {
      step: "03",
      title: "Development",
      description: "Build and iterate on your AI product with regular feedback and transparent progress."
    },
    {
      step: "04",
      title: "Deployment",
      description: "Launch your AI product with proper monitoring, documentation, and team training."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MLHeading level={1} className="text-5xl md:text-6xl font-display font-bold mb-8">
              AI Development Services
            </MLHeading>
            <MLText variant="bodyL" className="text-xl text-text-weak max-w-2xl mx-auto leading-relaxed">
              End-to-end AI product development with a focus on business impact and user experience.
            </MLText>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <MLHeading level={2} className="text-4xl font-semibold mb-6">
              Our Services
            </MLHeading>
            <MLText variant="bodyL" className="text-xl text-text-weak max-w-2xl mx-auto">
              From strategy to deployment, we handle every aspect of AI product development
            </MLText>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <MLHeading level={3} className="text-2xl font-semibold mb-4">
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
                    variant="outline"
                    onClick={() => navigate('/contact')}
                    className="w-full"
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
              className="px-8 py-4 text-lg"
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