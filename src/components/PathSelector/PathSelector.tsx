import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatedText } from '../AnimatedText/AnimatedText';
import { VeoButton, VeoArrowIcon } from '../VeoButton';
import { MLCard, MLText, MLHeading } from '../ML';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export const PathSelector = () => {
  const navigate = useNavigate();
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-bg">
      {/* Background Media Layer */}
      <div className="background-media">
        <picture>
          <source 
            srcSet="/images/path-selector-bg.webp" 
            type="image/webp" 
          />
          <img 
            src="/images/path-selector-bg.jpg" 
            alt="Abstract data visualization background" 
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </picture>
      </div>
      
      {/* Animated Background Elements (Fallback) */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/20 to-ion/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-48 h-48 bg-gradient-to-r from-ion/15 to-primary/15 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      
      <div ref={elementRef} className="max-w-5xl mx-auto text-center">
        <div className={`fade-in ${isVisible ? 'is-visible' : ''}`}>
          <AnimatedText
            variant="gradient"
            className="text-h1 font-bold font-primary mb-8 leading-tight text-text"
            delay={0.2}
          >
            Do you already know what you need?
          </AnimatedText>
        </div>
        
        <div className={`fade-in stagger-1 ${isVisible ? 'is-visible' : ''}`}>
          <MLText variant="bodyL" color="weak" className="mb-16 max-w-3xl mx-auto leading-relaxed">
            Choose your path to discover how MaterialLab can help bring your AI product vision to life.
          </MLText>
        </div>
        
        <div className={`grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto fade-in stagger-2 ${isVisible ? 'is-visible' : ''}`}>
          {/* Certain User Card */}
          <motion.div 
            className="group perspective cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/certain-user')}
          >
            <MLCard 
              variant="elevated" 
              padding="lg"
              className="relative transform-3d"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-ion/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-base" />
              
              <motion.div 
                className="relative z-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg flex items-center justify-center mx-auto mb-8 shadow-elevation-1"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.svg 
                    className="w-10 h-10 text-primary" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.1 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </motion.svg>
                </motion.div>
                
                <MLHeading level={3} className="mb-6">Yes, I know what I want</MLHeading>
                <MLText variant="bodyL" color="weak" className="mb-8 leading-relaxed">
                  You have a clear vision and specific requirements. Let's build it fast, reliable, and ready to scale.
                </MLText>
                
                <VeoButton
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<VeoArrowIcon />}
                  iconPosition="right"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/contact', { state: { projectType: 'certain' } });
                  }}
                >
                  Get Started
                </VeoButton>
              </motion.div>
            </MLCard>
          </motion.div>

          {/* Explorative User Card */}
          <motion.div 
            className="group perspective cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/explorative-user')}
          >
            <MLCard 
              variant="elevated" 
              padding="lg"
              className="relative transform-3d"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-ion/10 to-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-base" />
              
              <motion.div 
                className="relative z-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-ion/20 to-ion/40 rounded-lg flex items-center justify-center mx-auto mb-8 shadow-elevation-1"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.svg 
                    className="w-10 h-10 text-ion" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.1 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </motion.svg>
                </motion.div>
                
                <MLHeading level={3} className="mb-6">I'm exploring possibilities</MLHeading>
                <MLText variant="bodyL" color="weak" className="mb-8 leading-relaxed">
                  You're curious about what's possible and want to discover new opportunities. Let's explore together.
                </MLText>
                
                <VeoButton
                  variant="outline"
                  size="lg"
                  fullWidth
                  icon={<VeoArrowIcon />}
                  iconPosition="right"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/contact', { state: { projectType: 'explorative' } });
                  }}
                >
                  Explore With Us
                </VeoButton>
              </motion.div>
            </MLCard>
          </motion.div>
        </div>
        
        {/* Additional CTA */}
        <div className={`mt-16 text-center fade-in stagger-3 ${isVisible ? 'is-visible' : ''}`}>
          <MLText variant="bodyM" color="weaker" className="mb-4">Not sure which path fits you?</MLText>
          <VeoButton
            variant="ghost"
            size="md"
            icon={<VeoArrowIcon />}
            iconPosition="right"
            onClick={() => navigate('/contact')}
          >
            Schedule a Quick Chat
          </VeoButton>
        </div>
      </div>
    </section>
  );
};