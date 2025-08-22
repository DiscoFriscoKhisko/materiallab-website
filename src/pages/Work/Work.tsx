import { Layout } from '../../components/Layout/Layout';
import { MLHeading, MLText, MLButton, MLCard } from '../../components/ML';
import { MediaPlaceholder } from '../../components/MediaPlaceholder/MediaPlaceholder';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Work = () => {
  const navigate = useNavigate();

  const projects = [
    {
      title: "FinTech MVP: 0 to 10k users in 8 weeks",
      client: "Confidential Client",
      category: "SMB • FinTech",
      challenge: "Launch a peer-to-peer payment app in a competitive market with limited runway",
      solution: "Focused MVP with core payment flows, integrated fraud detection, and viral sharing features",
      results: ["10,000+ registered users", "98% uptime", "4.8★ app store rating", "Series A funding secured"],
      timeline: "8 weeks",
      technologies: ["React Native", "Node.js", "Stripe", "AWS"],
      testimonial: {
        quote: "MaterialLab delivered exactly what we needed, when we needed it. Their focus on essentials got us to market fast.",
        author: "Founder, FinTech Startup"
      }
    },
    {
      title: "E-commerce automation: 80% reduction in manual work",
      client: "Premium Wellness Brand",
      category: "Creator • E-commerce",
      challenge: "Manual order processing and customer service consuming 40+ hours weekly",
      solution: "Automated order flows, customer support system, and inventory management dashboard",
      results: ["80% reduction in manual work", "$2M+ processed automatically", "2x faster customer response", "Team focused on growth"],
      timeline: "6 weeks",
      technologies: ["Shopify Plus", "Custom APIs", "Zapier", "Automation tools"],
      testimonial: {
        quote: "Game changer. We went from drowning in admin work to focusing on what we do best - creating great products.",
        author: "CEO, Wellness Brand"
      }
    },
    {
      title: "HR workflow automation: 4-week pilot to full rollout",
      client: "Mid-size Tech Company",
      category: "SaaS • HR Operations",
      challenge: "Resume screening and interview scheduling taking 20+ hours per hire",
      solution: "Automated resume analysis, scheduling system, and candidate communication workflow",
      results: ["6x faster screening", "90% scheduling automation", "Better candidate experience", "Full company rollout"],
      timeline: "4 weeks pilot",
      technologies: ["API integrations", "Calendar APIs", "Custom workflow engine"],
      testimonial: {
        quote: "The pilot was so successful, we immediately expanded it company-wide. ROI was clear from week 2.",
        author: "Head of People, Tech Company"
      }
    }
  ];

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
                Our Work
              </MLHeading>
              
              <MLText variant="bodyL" color="weak" className="mb-12 max-w-3xl mx-auto">
                Real results from real projects. See how we've helped startups, creators, and companies build products people love.
              </MLText>
            </motion.div>
          </div>
        </section>

        {/* Projects */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-6xl mx-auto space-y-24">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <MLCard className="p-8 lg:p-12">
                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Project Details */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <MLText variant="caption" className="bg-primary/20 text-primary font-medium px-3 py-1 rounded-full">
                          {project.category}
                        </MLText>
                        <MLText variant="caption" color="weaker">
                          {project.timeline}
                        </MLText>
                      </div>
                      
                      <MLHeading level={2} className="mb-4">
                        {project.title}
                      </MLHeading>
                      
                      <MLText variant="bodyS" color="weak" className="mb-6">
                        {project.client}
                      </MLText>
                      
                      <div className="space-y-6">
                        <div>
                          <MLHeading level={5} className="mb-2 text-primary">
                            Challenge
                          </MLHeading>
                          <MLText variant="bodyM" color="weak">
                            {project.challenge}
                          </MLText>
                        </div>
                        
                        <div>
                          <MLHeading level={5} className="mb-2 text-ion">
                            Solution
                          </MLHeading>
                          <MLText variant="bodyM" color="weak">
                            {project.solution}
                          </MLText>
                        </div>
                        
                        <div>
                          <MLHeading level={5} className="mb-3">
                            Results
                          </MLHeading>
                          <div className="grid grid-cols-2 gap-3">
                            {project.results.map((result, idx) => (
                              <div key={idx} className="flex items-start">
                                <svg className="w-4 h-4 text-success mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <MLText variant="bodyS" className="font-medium">
                                  {result}
                                </MLText>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <MLHeading level={5} className="mb-2">
                            Technologies
                          </MLHeading>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, idx) => (
                              <MLText key={idx} variant="caption" className="bg-surface-2 text-text-weak px-2 py-1 rounded">
                                {tech}
                              </MLText>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Visual + Testimonial */}
                    <div className="space-y-6">
                      <MediaPlaceholder
                        type="image"
                        title={`${project.title} - Screenshot`}
                        description="Product screenshot or dashboard view showing key interface elements and results metrics"
                        aspectRatio="video"
                      />
                      
                      {/* Testimonial */}
                      <MLCard variant="glow-primary" className="p-6">
                        <MLText variant="bodyM" className="mb-4 italic">
                          "{project.testimonial.quote}"
                        </MLText>
                        <MLText variant="bodyS" color="weak" className="font-medium">
                          — {project.testimonial.author}
                        </MLText>
                      </MLCard>
                    </div>
                  </div>
                </MLCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process Preview */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface/10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <MLHeading level={3} className="mb-6">
                Every project follows our proven process
              </MLHeading>
              <MLText variant="bodyL" color="weak" className="mb-8">
                Discovery → Strategy → Build → Launch. Battle-tested methodology designed for speed and results.
              </MLText>
              <MLButton
                variant="text"
                size="lg"
                onClick={() => navigate('/approach')}
                iconRight={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                Learn about our approach
              </MLButton>
            </motion.div>
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
              Ready to become our next success story?
            </MLHeading>
            <MLText variant="bodyL" color="weak" className="mb-8">
              Let's discuss your project and create something people love.
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