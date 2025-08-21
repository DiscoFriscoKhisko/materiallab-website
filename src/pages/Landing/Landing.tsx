import { Layout } from '../../components/Layout/Layout';
import { PathSelector } from '../../components/PathSelector/PathSelector';
import { AnimatedText } from '../../components/AnimatedText/AnimatedText';
import { motion } from 'framer-motion';
import { useScrollReveal, useCountUp } from '../../utils/hooks';

export const Landing = () => {
  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <AnimatedText
                variant="stagger"
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 leading-tight"
                delay={0.2}
              >
                Build AI Products
              </AnimatedText>
              
              <AnimatedText
                variant="glitch"
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-600 mb-8 leading-tight block"
                delay={1}
              >
                That Actually Work
              </AnimatedText>
              
              <motion.p 
                className="text-xl sm:text-2xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8, ease: 'easeOut' }}
              >
                From concept to scale, we help you discover, design, and build AI-powered products 
                that solve real problems and drive real results.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.2 }}
              >
                {[
                  'AI-Native Development',
                  'Proven Results', 
                  'End-to-End Support'
                ].map((text, index) => (
                  <motion.div 
                    key={text}
                    className="flex items-center space-x-2 text-slate-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 2.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, color: '#22c55e' }}
                  >
                    <motion.svg 
                      className="w-5 h-5 text-green-500" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 2.4 + index * 0.1 + 0.2, type: 'spring', stiffness: 300 }}
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </motion.svg>
                    <span>{text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
          
          {/* Enhanced Background decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div 
              className="absolute top-40 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
                x: [0, 50, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <motion.div 
              className="absolute bottom-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
                x: [0, -30, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1
              }}
            />
            {/* New floating geometric shapes */}
            <motion.div
              className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-primary-300/30 rotate-45"
              animate={{ rotate: [45, 225, 45] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute bottom-1/3 left-1/4 w-8 h-8 bg-purple-300/20 rounded-full"
              animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </section>

        {/* Path Selection */}
        <PathSelector />

        {/* Trust Indicators & Stats */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <AnimatedText
                variant="fadeUp"
                className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6"
                delay={0.2}
              >
                Trusted by Forward-Thinking Companies
              </AnimatedText>
              <motion.p 
                className="text-slate-600 max-w-2xl mx-auto text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                From startups to enterprises, we've helped dozens of companies successfully 
                integrate AI into their products and workflows.
              </motion.p>
            </div>

            {/* Animated Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                { number: 50, label: 'AI Products Built', suffix: '+' },
                { number: 2, label: 'Years Experience', suffix: '+' },
                { number: 99, label: 'Client Satisfaction', suffix: '%' },
                { number: 24, label: 'Response Time', suffix: 'h' }
              ].map((stat, index) => {
                const CountUpComponent = () => {
                  const { ref, count } = useCountUp(stat.number, 2000);
                  return (
                    <motion.div
                      ref={ref}
                      className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <motion.div
                        className="text-4xl font-bold text-primary-600 mb-2"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1, type: 'spring', stiffness: 200 }}
                      >
                        {count}{stat.suffix}
                      </motion.div>
                      <div className="text-slate-600 font-medium">{stat.label}</div>
                    </motion.div>
                  );
                };
                return <CountUpComponent key={index} />;
              })}
            </motion.div>
            
            {/* Enhanced Client Logos */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {['TechCorp', 'InnovateLab', 'AI Dynamics', 'FutureScale'].map((company, i) => (
                <motion.div 
                  key={i} 
                  className="h-16 glass rounded-xl flex items-center justify-center group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span 
                    className="text-slate-500 group-hover:text-slate-700 font-semibold text-lg transition-colors"
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {company}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};