import { Layout } from '../../components/Layout/Layout';
import { MLHeading, MLText, MLCard } from '../../components/ML';
import { Button as VeoButton } from '../../components/UI';
import { VeoArrowRightIcon } from '../../components/VeoIcon';
import { MediaPlaceholder } from '../../components/MediaPlaceholder/MediaPlaceholder';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Work = () => {
  const navigate = useNavigate();

  const projects = [
    {
      title: "Founder with limited runway needed revenue fast",
      client: "B2B SaaS Startup",
      category: "Growing Business • Technology",
      challenge: "Solo founder, no technical cofounder, competitive market, limited runway for experimentation",
      solution: "Technical partnership approach: rapid prototype validation, payment integration, production deployment",
      results: ["Working prototype validated with potential customers", "First paying customer achieved", "Multiple customers and MRR growth", "Series A discussions initiated"],
      timeline: "Partnership approach",
      technologies: ["Modern web stack", "Payment systems", "Production deployment"],
      testimonial: {
        quote: "They understood that every moment mattered. No long discovery phase, just rapid building based on real customer feedback.",
        author: "Founder, B2B SaaS"
      }
    },
    {
      title: "Growing team overwhelmed by manual processes",
      client: "Creative Agency",
      category: "Growing Business • Automation",
      challenge: "Manual processes consuming team bandwidth, reducing time available for client work and growth",
      solution: "Process analysis and automation of repetitive workflows, elegant tool integration, team training",
      results: ["Hours saved weekly, measurably", "Team refocused on high-value work", "Improved client service capacity", "Scalable workflow systems"],
      timeline: "Iterative approach",
      technologies: ["Workflow automation", "API integrations", "Custom solutions"],
      testimonial: {
        quote: "We went from drowning in busy work to focusing on what we do best. The team actually enjoys the streamlined processes.",
        author: "Creative Director"
      }
    },
    {
      title: "Technical debt blocking business growth",
      client: "Established Service Business",
      category: "Growing Business • Modernization", 
      challenge: "Legacy systems creating bottlenecks, preventing team from serving more customers effectively",
      solution: "Systematic modernization approach, maintaining business continuity while upgrading core systems",
      results: ["System reliability dramatically improved", "Team velocity increased significantly", "Customer capacity expanded", "Business growth unblocked"],
      timeline: "Phased approach",
      technologies: ["Modern architecture", "System integration", "Data migration"],
      testimonial: {
        quote: "They made complex technical work feel manageable. Business kept running smoothly while we modernized everything underneath.",
        author: "Operations Director"
      }
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-bg">
        {/* Hero Section */}
        <section className="py-veo-16 lg:py-veo-20 px-veo-4 sm:px-veo-6 lg:px-veo-8">
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
                Real stories from real partnerships. See how we've helped growing businesses build technology that matters.
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
                <MLCard className="p-veo-6 lg:p-veo-8 shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-300 border border-white/5 hover:border-white/10">
                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Project Details */}
                    <div>
                      <div className="flex items-center gap-veo-2 mb-veo-4">
                        <MLText variant="caption" className="bg-primary/20 text-primary font-medium px-veo-3 py-veo-1 rounded-full">
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
                      
                      <div className="space-y-veo-6">
                        <div>
                          <MLHeading level={5} className="mb-veo-2 text-primary">
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
                          <div className="grid grid-cols-2 gap-veo-3">
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
                          <div className="flex flex-wrap gap-veo-2">
                            {project.technologies.map((tech, idx) => (
                              <MLText key={idx} variant="caption" className="bg-surface-2 text-text-weak px-veo-2 py-veo-1 rounded-veo">
                                {tech}
                              </MLText>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Visual + Testimonial */}
                    <div className="space-y-veo-6">
                      <MediaPlaceholder
                        type="image"
                        title={`${project.title} - Screenshot`}
                        description="Product screenshot or dashboard view showing key interface elements and results metrics"
                        aspectRatio="video"
                      />
                      
                      {/* Testimonial */}
                      <MLCard variant="glow-primary" className="p-veo-6 shadow-elevation-2 border border-primary/20">
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
              <VeoButton
                variant="ghost"
                size="lg"
                onClick={() => navigate('/approach')}
                icon={<VeoArrowRightIcon />}
                iconPosition="right"
              >
                Learn about our approach
              </VeoButton>
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
            <VeoButton
              variant="primary"
              size="lg"
              onClick={() => navigate('/contact')}
              icon={<VeoArrowRightIcon />}
              iconPosition="right"
              className="font-semibold shadow-elevation-2 hover:shadow-elevation-3 hover:scale-105 transition-all duration-200"
            >
              Book a call
            </VeoButton>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};