import { Layout } from '../../components/Layout/Layout';
import { WhatWeDo as WhatWeDoSection } from '../../components/WhatWeDo/WhatWeDo';
import { MLHeading, MLText, MLButton } from '../../components/ML';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const WhatWeDoPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen bg-bg">
        {/* Hero Section */}
        <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <MLHeading level={1} className="mb-6">
                What We Do
              </MLHeading>
              
              <MLText variant="bodyL" color="weak" className="mb-12 max-w-3xl mx-auto">
                Our integrated approach combines research, design, engineering, and AI to deliver products that work from day one and scale with your business.
              </MLText>
            </motion.div>
          </div>
        </section>

        {/* What We Do Section */}
        <WhatWeDoSection />

        {/* Process Deep Dive */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface/10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <MLHeading level={2} className="mb-6">
                Our Proven Process
              </MLHeading>
              <MLText variant="bodyL" color="weak" className="max-w-3xl mx-auto">
                Every project follows our battle-tested methodology designed for speed, transparency, and results.
              </MLText>
            </motion.div>

            <div className="space-y-16">
              {[
                {
                  phase: "01",
                  title: "Discover & Validate",
                  description: "We start by understanding your users, market, and business constraints. Through rapid research and validation, we identify the core features that will drive adoption and revenue.",
                  deliverables: ["User research synthesis", "Market analysis", "Feature prioritization", "Technical feasibility assessment"],
                  timeline: "1-2 weeks"
                },
                {
                  phase: "02",
                  title: "Design & Prototype",
                  description: "Clean, conversion-focused designs that work across devices. We prototype key interactions early to validate usability and technical approach.",
                  deliverables: ["Design system", "High-fidelity mockups", "Interactive prototype", "Developer handoff assets"],
                  timeline: "1-3 weeks"
                },
                {
                  phase: "03",
                  title: "Build & Test",
                  description: "Modern, scalable development with continuous integration. Weekly demos keep you in the loop while we handle the technical complexity.",
                  deliverables: ["Production-ready application", "Automated testing suite", "Documentation", "Deployment pipeline"],
                  timeline: "2-8 weeks"
                },
                {
                  phase: "04",
                  title: "Launch & Optimize",
                  description: "We don't just hand over code. Analytics implementation, performance monitoring, and post-launch support ensure your product succeeds in the real world.",
                  deliverables: ["Analytics setup", "Performance monitoring", "Launch support", "Optimization recommendations"],
                  timeline: "1-2 weeks"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="grid lg:grid-cols-2 gap-12 items-center"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center mb-4">
                      <span className="text-coral font-display text-sm font-bold bg-coral/20 px-3 py-1 rounded-full mr-4">
                        {step.phase}
                      </span>
                      <span className="text-text-weak text-sm">{step.timeline}</span>
                    </div>
                    
                    <MLHeading level={3} className="mb-4">
                      {step.title}
                    </MLHeading>
                    
                    <MLText variant="bodyM" color="weak" className="mb-6">
                      {step.description}
                    </MLText>
                    
                    <div>
                      <MLText variant="bodyS" className="font-medium mb-3">
                        Key Deliverables:
                      </MLText>
                      <ul className="space-y-2">
                        {step.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="w-4 h-4 text-coral mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <MLText variant="bodyS" color="weak">{item}</MLText>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className={`bg-surface/50 rounded-2xl p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="aspect-video bg-gradient-to-br from-coral/10 to-ion/10 rounded-lg flex items-center justify-center">
                      <MLText variant="bodyS" color="weaker" className="text-center">
                        Process visualization placeholder<br/>
                        (Diagram for {step.title})
                      </MLText>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <MLHeading level={3} className="mb-6">
              Ready to start building?
            </MLHeading>
            <MLText variant="bodyL" color="weak" className="mb-8">
              Let's discuss your project and see how our process can help you move fast.
            </MLText>
            <MLButton
              variant="filled"
              size="lg"
              onClick={() => navigate('/contact')}
              iconRight={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              }
            >
              Book a call
            </MLButton>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};