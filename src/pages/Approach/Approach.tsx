import { Layout } from '../../components/Layout/Layout';
import { MLSectionTitle, MLText, MLButton, MLHeading } from '../../components/ML';
import { ContactSplit } from '../../components/ContactCTA';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const Approach = () => {
  const navigate = useNavigate();
  const heroRef = useScrollAnimation({ threshold: 0.2 });
  const processRef = useScrollAnimation({ threshold: 0.3 });
  const principlesRef = useScrollAnimation({ threshold: 0.3 });

  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      duration: "1-2 weeks",
      description: "We start every project by deeply understanding your business, users, and goals.",
      activities: ["Stakeholder interviews", "User research", "Market analysis", "Technical feasibility study"]
    },
    {
      number: "02",
      title: "Strategy",
      duration: "1 week",
      description: "Based on our findings, we create a clear product strategy and roadmap.",
      activities: ["Feature prioritization", "Technical architecture", "Project timeline", "Success metrics"]
    },
    {
      number: "03",
      title: "Build",
      duration: "4-12 weeks",
      description: "Our team designs and develops your product with regular check-ins and iterations.",
      activities: ["Design & prototyping", "Development sprints", "Quality assurance", "User testing"]
    },
    {
      number: "04",
      title: "Launch",
      duration: "1-2 weeks",
      description: "We support you through launch and provide ongoing optimization.",
      activities: ["Deployment", "Performance monitoring", "User feedback", "Continuous improvement"]
    }
  ];

  const principles = [
    {
      title: "User-Centered Design",
      description: "Every decision we make is informed by user needs and validated through testing.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Technical Excellence",
      description: "We build with modern technologies, best practices, and scalable architecture from day one.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Rapid Iteration",
      description: "We work in short cycles, gathering feedback early and often to ensure we're building the right thing.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: "Transparent Communication",
      description: "You'll always know what we're working on, why we're doing it, and what's coming next.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
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
                Our Approach
              </MLText>
              
              <MLText variant="body" color="weak" className="mb-12 max-line-length mx-auto paragraph-spacing">
                A proven methodology that combines deep discovery, user-centered design, and technical excellence 
                to deliver products that solve real problems and drive results.
              </MLText>
            </motion.div>
          </div>
        </section>

        {/* Process Steps */}
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
                subtitle="A structured approach that gets results"
                className="mb-8"
              >
                How we work
              </MLSectionTitle>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  className="p-8 rounded-2xl bg-surface-1 border border-outline-variant"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                      <MLText variant="bodyM" className="text-text-inverse font-bold">
                        {step.number}
                      </MLText>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <MLHeading level={3}>
                          {step.title}
                        </MLHeading>
                        <MLText variant="bodyS" color="weak">
                          {step.duration}
                        </MLText>
                      </div>
                      <MLText variant="body" color="weak" className="mb-6">
                        {step.description}
                      </MLText>
                      <div className="space-y-2">
                        {step.activities.map((activity) => (
                          <div key={activity} className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <MLText variant="bodyS" color="text">
                              {activity}
                            </MLText>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section ref={principlesRef.ref} className="scene-module">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={principlesRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <MLSectionTitle
                variant="headline"
                align="center"
                animate={true}
                subtitle="The principles that guide everything we do"
                className="mb-8"
              >
                Core Principles
              </MLSectionTitle>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  className="text-center p-8 rounded-2xl bg-surface-1 border border-outline-variant hover:border-primary/20 transition-colors duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                    {principle.icon}
                  </div>
                  <MLHeading level={4} className="mb-4">
                    {principle.title}
                  </MLHeading>
                  <MLText variant="bodyS" color="weak">
                    {principle.description}
                  </MLText>
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
              <MLButton
                variant="outlined"
                onClick={() => navigate('/work')}
                iconRight={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                See this approach in action
              </MLButton>
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