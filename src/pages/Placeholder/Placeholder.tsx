import { Layout } from '../../components/Layout/Layout';
import { motion } from 'framer-motion';
import { MLButton, MLCard, MLText, MLHeading } from '../../components/ML';
import { useNavigate } from 'react-router-dom';

interface PlaceholderProps {
  title: string;
  description: string;
  sections: {
    title: string;
    content: string;
    mediaDescription?: string;
  }[];
  ctaText?: string;
  ctaAction?: () => void;
}

export const Placeholder = ({ 
  title, 
  description, 
  sections,
  ctaText = "Contact Us for More Info",
  ctaAction
}: PlaceholderProps) => {
  const navigate = useNavigate();

  const handleCTA = () => {
    if (ctaAction) {
      ctaAction();
    } else {
      navigate('/contact');
    }
  };

  return (
    <Layout>
      <div className="relative overflow-hidden bg-bg min-h-screen">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-coral/10 to-ion/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-20 right-1/4 w-48 h-48 bg-gradient-to-r from-ion/10 to-coral/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Header Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-ion/20 border border-ion/30 rounded-full text-ion font-medium text-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              Coming Soon
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <MLHeading level={1} className="mb-6">
                {title}
              </MLHeading>
              <MLText variant="bodyL" color="weak" className="max-w-3xl mx-auto mb-12">
                {description}
              </MLText>
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:gap-12">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <MLCard className="p-8">
                    <div className={`grid gap-8 ${section.mediaDescription ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                      <div>
                        <MLHeading level={3} className="mb-4">
                          {section.title}
                        </MLHeading>
                        <MLText color="weak" className="leading-relaxed">
                          {section.content}
                        </MLText>
                      </div>
                      
                      {section.mediaDescription && (
                        <div className="relative">
                          <div className="aspect-video bg-surface-2 rounded-lg border-2 border-dashed border-glass-light flex items-center justify-center p-6">
                            <div className="text-center">
                              <motion.svg 
                                className="w-12 h-12 text-ion mx-auto mb-4"
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </motion.svg>
                              <MLText variant="bodyS" color="weaker" className="text-center">
                                {section.mediaDescription}
                              </MLText>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </MLCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <MLCard className="p-12 bg-gradient-to-br from-coral/10 to-ion/10 border-coral/20">
              <MLHeading level={3} className="mb-6">
                Page Under Construction
              </MLHeading>
              <MLText variant="bodyL" color="weak" className="mb-8 max-w-2xl mx-auto">
                This page is currently being developed with detailed content, case studies, and interactive elements. 
                For immediate assistance, please get in touch with us.
              </MLText>
              <MLButton
                variant="filled"
                size="lg"
                onClick={handleCTA}
                iconRight={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                {ctaText}
              </MLButton>
            </MLCard>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};