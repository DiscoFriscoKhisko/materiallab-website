import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './UI';
import { VeoVideoCard } from './VeoVideoCard';
import { useNavigate } from 'react-router-dom';

interface VeoStyleHeroProps {
  title: string;
  subtitle: string;
  primaryCta?: {
    text: string;
    path: string;
  };
  secondaryCta?: {
    text: string;
    path: string;
  };
  className?: string;
}

interface DemoExample {
  id: string;
  prompt: string;
  videoSrc: string;
  posterSrc: string;
  title: string;
}

const demoExamples: DemoExample[] = [
  {
    id: 'fintech-dashboard',
    prompt: 'Create a modern fintech dashboard with real-time analytics',
    videoSrc: 'https://cdn.pixabay.com/vimeo/395498881/technology-29411.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'FinTech Dashboard'
  },
  {
    id: 'ai-chatbot',
    prompt: 'Build an intelligent customer service chatbot with sentiment analysis',
    videoSrc: 'https://cdn.pixabay.com/vimeo/459126904/development-50616.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'AI Customer Service'
  },
  {
    id: 'ecommerce-automation',
    prompt: 'Automate e-commerce inventory management with predictive analytics',
    videoSrc: 'https://cdn.pixabay.com/vimeo/449239294/automation-49238.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'E-commerce Automation'
  }
];

export const VeoStyleHero = ({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  className = ""
}: VeoStyleHeroProps) => {
  const navigate = useNavigate();
  const [activeExample, setActiveExample] = useState(0);
  const [userPrompt, setUserPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Auto-cycle through examples
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveExample((prev) => (prev + 1) % demoExamples.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleTryDemo = () => {
    if (!userPrompt.trim()) {
      setUserPrompt('Create a modern AI-powered web application');
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      navigate('/veo');
    }, 2000);
  };

  return (
    <section className={`min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-white via-gray-50/30 to-blue-50/20 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Trust badges */}
            <motion.div 
              className="flex items-center space-x-3 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.05, 0.7, 0.1, 1] }}
            >
              <span 
                className="text-blue-600 px-3 py-1.5 rounded-lg font-medium"
                style={{
                  backgroundColor: 'rgba(26, 115, 232, 0.08)',
                  fontSize: 'var(--veo-text-label-large)'
                }}
              >
                AI-Powered
              </span>
              <span 
                className="text-green-600 px-3 py-1.5 rounded-lg font-medium"
                style={{
                  backgroundColor: 'rgba(52, 168, 83, 0.08)',
                  fontSize: 'var(--veo-text-label-large)'
                }}
              >
                Production Ready
              </span>
              <span 
                className="text-orange-600 px-3 py-1.5 rounded-lg font-medium"
                style={{
                  backgroundColor: 'rgba(251, 188, 4, 0.08)',
                  fontSize: 'var(--veo-text-label-large)'
                }}
              >
                2-Week MVP
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1 
              className="font-veo font-normal tracking-tight text-gray-900"
              style={{
                fontSize: 'var(--veo-text-display-medium)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.3, 
                duration: 0.8, 
                ease: [0.05, 0.7, 0.1, 1] 
              }}
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="font-veo text-gray-600 leading-relaxed max-w-2xl"
              style={{
                fontSize: 'var(--veo-text-title-large)',
                lineHeight: '1.5'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.4, 
                duration: 0.8, 
                ease: [0.05, 0.7, 0.1, 1] 
              }}
            >
              {subtitle}
            </motion.p>

            {/* Interactive prompt input */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.5, 
                duration: 0.8, 
                ease: [0.05, 0.7, 0.1, 1] 
              }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Describe your AI product idea..."
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  className="w-full px-6 py-4 border border-gray-300 rounded-lg font-veo placeholder-gray-400 transition-all duration-200 ease-out"
                  style={{
                    fontSize: 'var(--veo-text-body-large)',
                    outline: 'none',
                    boxShadow: 'var(--elevation-0)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#1a73e8';
                    e.target.style.boxShadow = '0 0 0 2px rgba(26, 115, 232, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'var(--elevation-0)';
                  }}
                />
                <motion.button
                  onClick={handleTryDemo}
                  disabled={isGenerating}
                  className="absolute right-2 top-2 text-white px-6 py-2 rounded-lg font-veo font-medium transition-all duration-200 ease-out disabled:opacity-50 relative overflow-hidden"
                  style={{
                    background: '#1a73e8',
                    boxShadow: 'var(--elevation-1)',
                    fontSize: 'var(--veo-text-label-large)'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: 'var(--elevation-2)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isGenerating ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Building...</span>
                    </div>
                  ) : (
                    'Try Demo'
                  )}
                  {/* Button state layer */}
                  <span className="absolute inset-0 bg-white/0 hover:bg-white/8 active:bg-white/12 transition-colors duration-150" />
                </motion.button>
              </div>
              <p 
                className="text-gray-500 font-veo"
                style={{ fontSize: 'var(--veo-text-body-medium)' }}
              >
                Enter your idea and see how we can bring it to life with AI
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.6, 
                duration: 0.8, 
                ease: [0.05, 0.7, 0.1, 1] 
              }}
            >
              {primaryCta && (
                <motion.button
                  onClick={() => navigate(primaryCta.path)}
                  className="text-white px-8 py-4 font-veo font-medium rounded-lg transition-all duration-200 ease-out relative overflow-hidden"
                  style={{
                    background: '#1a73e8',
                    boxShadow: 'var(--elevation-1)',
                    fontSize: 'var(--veo-text-title-medium)'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: 'var(--elevation-2)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {primaryCta.text}
                  {/* Button state layer */}
                  <span className="absolute inset-0 bg-white/0 hover:bg-white/8 active:bg-white/12 transition-colors duration-150" />
                </motion.button>
              )}
              
              {secondaryCta && (
                <motion.button
                  onClick={() => navigate(secondaryCta.path)}
                  className="text-gray-700 px-8 py-4 font-veo font-medium rounded-lg transition-all duration-200 ease-out border border-gray-300 hover:border-blue-600 hover:text-blue-600 relative overflow-hidden"
                  style={{
                    fontSize: 'var(--veo-text-title-medium)',
                    boxShadow: 'var(--elevation-0)'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: 'var(--elevation-1)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {secondaryCta.text}
                  {/* Button ripple effect */}
                  <span className="absolute inset-0 bg-blue-600/0 hover:bg-blue-600/4 active:bg-blue-600/8 transition-colors duration-150" />
                </motion.button>
              )}
            </motion.div>
          </motion.div>

          {/* Right Side - Video Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Featured video */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExample}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <VeoVideoCard
                    title={demoExamples[activeExample].title}
                    description="Built with MaterialLab AI Studio"
                    prompt={demoExamples[activeExample].prompt}
                    videoSrc={demoExamples[activeExample].videoSrc}
                    posterSrc={demoExamples[activeExample].posterSrc}
                    aspectRatio="16:9"
                    lazy={false}
                    className="shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floating stats */}
              <motion.div
                className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-veo font-medium text-gray-700">Live Demo</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="text-center">
                  <div className="text-lg font-veo font-bold text-primary">2 weeks</div>
                  <div className="text-xs text-gray-600">to MVP</div>
                </div>
              </motion.div>
            </div>

            {/* Example indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {demoExamples.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveExample(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === activeExample ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Default props for MaterialLab content
VeoStyleHero.defaultProps = {
  title: "AI Product Studio",
  subtitle: "Turn your ideas into production-ready AI applications. From concept to deployment, we build the future with you.",
  primaryCta: {
    text: "See Our Work",
    path: "/work"
  },
  secondaryCta: {
    text: "Start Building",
    path: "/contact"
  }
};