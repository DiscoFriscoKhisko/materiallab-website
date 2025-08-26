import { Layout } from '../../components/Layout/Layout';
import { MLText, MLHeading } from '../../components/ML';
import { Button as VeoButton } from '../../components/UI';
import { VeoArrowRightIcon } from '../../components/VeoIcon';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAnimation } from '../../hooks/useAnimation';

export const Insights = () => {
  const navigate = useNavigate();
  const heroRef = useAnimation({ threshold: 0.2 });

  return (
    <Layout>
      <div className="relative overflow-hidden bg-background">
        {/* Hero Section */}
        <section ref={heroRef.ref} className="scene-module min-h-[60vh] flex items-center">
          <div className="max-w-4xl mx-auto px-veo-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <MLText variant="display" as="h1" className="mb-6 heading-spacing-tight">
                Insights
              </MLText>
              
              <MLText variant="body" color="weak" className="mb-12 max-line-length mx-auto paragraph-spacing">
                We're working on something special. Soon we'll be sharing insights on product development, 
                lessons learned from our projects, and industry trends.
              </MLText>

              <div className="space-y-veo-6">
                <div className="p-veo-6 rounded-veo-2xl bg-surface-1 border border-outline-variant max-w-2xl mx-auto">
                  <MLHeading level={3} className="mb-veo-4">
                    Coming Soon
                  </MLHeading>
                  <MLText variant="body" color="weak" className="mb-veo-6">
                    In the meantime, feel free to reach out if you have questions about product development 
                    or want to discuss your project.
                  </MLText>
                  <div className="flex flex-col sm:flex-row gap-veo-4 justify-center">
                    <VeoButton
                      variant="primary"
                      onClick={() => navigate('/contact')}
                      icon={<VeoArrowRightIcon />}
                      iconPosition="right"
                    >
                      Get in touch
                    </VeoButton>
                    <VeoButton
                      variant="outline"
                      onClick={() => navigate('/work')}
                      icon={<VeoArrowRightIcon />}
                      iconPosition="right"
                    >
                      View our work
                    </VeoButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-tertiary/5 to-primary/5 rounded-full blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], rotate: [360, 0, 360] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};