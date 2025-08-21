import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatedText } from '../AnimatedText/AnimatedText';
import { MagneticButton } from '../MagneticButton/MagneticButton';

export const PathSelector = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-200/30 to-blue-200/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      
      <div className="max-w-5xl mx-auto text-center">
        <AnimatedText
          variant="gradient"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
          delay={0.2}
        >
          Do you already know what you need?
        </AnimatedText>
        
        <motion.p 
          className="text-xl text-slate-600 mb-16 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Choose your path to discover how MaterialLab can help bring your AI product vision to life.
        </motion.p>
        
        <motion.div 
          className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Certain User Card */}
          <motion.div 
            className="group perspective cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/certain-user')}
          >
            <motion.div
              className="relative p-10 bg-white rounded-3xl shadow-xl border border-gray-100/50 transform-3d transition-all duration-500 group-hover:shadow-2xl"
              whileHover={{ rotateY: 5, rotateX: 5 }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 to-emerald-50/80 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <motion.div 
                className="relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-200 rounded-3xl flex items-center justify-center mx-auto mb-8"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.svg 
                    className="w-10 h-10 text-green-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.1 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </motion.svg>
                </motion.div>
                
                <h3 className="text-3xl font-bold text-slate-900 mb-6">Yes, I know what I want</h3>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                  You have a clear vision and specific requirements. Let's build it fast, reliable, and ready to scale.
                </p>
                
                <MagneticButton
                  variant="primary"
                  size="lg"
                  showArrow
                  className="w-full justify-center bg-green-600 hover:bg-green-700 focus:ring-green-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/certain-user');
                  }}
                >
                  Get Started
                </MagneticButton>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Explorative User Card */}
          <motion.div 
            className="group perspective cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/explorative-user')}
          >
            <motion.div
              className="relative p-10 bg-white rounded-3xl shadow-xl border border-gray-100/50 transform-3d transition-all duration-500 group-hover:shadow-2xl"
              whileHover={{ rotateY: -5, rotateX: 5 }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-blue-50/80 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <motion.div 
                className="relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-8"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.svg 
                    className="w-10 h-10 text-purple-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.1 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </motion.svg>
                </motion.div>
                
                <h3 className="text-3xl font-bold text-slate-900 mb-6">I'm exploring possibilities</h3>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                  You're curious about what's possible and want to discover new opportunities. Let's explore together.
                </p>
                
                <MagneticButton
                  variant="secondary"
                  size="lg"
                  showArrow
                  className="w-full justify-center border-purple-200 hover:bg-purple-50 hover:border-purple-300 text-purple-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/explorative-user');
                  }}
                >
                  Explore With Us
                </MagneticButton>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Additional CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-slate-500 mb-4">Not sure which path fits you?</p>
          <MagneticButton
            variant="ghost"
            size="md"
            className="text-primary-600 hover:text-primary-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Schedule a Quick Chat
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};