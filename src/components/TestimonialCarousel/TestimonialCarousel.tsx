import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MLCard, MLText } from '../ML';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoRotate?: boolean;
  autoRotateInterval?: number;
  className?: string;
}

export const TestimonialCarousel = ({
  testimonials,
  autoRotate = true,
  autoRotateInterval = 5000,
  className = '',
}: TestimonialCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotation logic
  useEffect(() => {
    if (!autoRotate || isPaused || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [autoRotate, current, testimonials.length, autoRotateInterval, isPaused]);

  const handleDotClick = (index: number) => {
    setCurrent(index);
  };

  if (!testimonials.length) return null;

  const currentTestimonial = testimonials[current];

  return (
    <div 
      className={`testimonial-carousel max-w-4xl mx-auto ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Testimonial Content */}
      <div className="relative h-80 mb-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <MLCard 
              variant="glow-primary" 
              className="h-full flex items-center justify-center p-8 lg:p-12"
            >
              <div className="text-center max-w-3xl">
                {/* Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <MLText 
                    variant="bodyL" 
                    className="leading-relaxed mb-8 italic"
                  >
                    "{currentTestimonial.quote}"
                  </MLText>
                </motion.div>

                {/* Author Info */}
                <motion.div
                  className="flex items-center justify-center space-x-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {/* Avatar */}
                  {currentTestimonial.avatar ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-2 flex-shrink-0">
                      <img 
                        src={currentTestimonial.avatar} 
                        alt={currentTestimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <MLText variant="bodyM" className="text-primary font-semibold">
                        {currentTestimonial.author.charAt(0)}
                      </MLText>
                    </div>
                  )}

                  {/* Author Details */}
                  <div className="text-left">
                    <MLText className="font-semibold text-on-surface">
                      {currentTestimonial.author}
                    </MLText>
                    <MLText variant="bodyS" color="weak">
                      {currentTestimonial.role} • {currentTestimonial.company}
                    </MLText>
                  </div>
                </motion.div>

                {/* Rating Stars (if provided) */}
                {currentTestimonial.rating && (
                  <motion.div
                    className="flex justify-center space-x-1 mt-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < currentTestimonial.rating! 
                            ? 'text-primary' 
                            : 'text-on-surface/20'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </motion.div>
                )}
              </div>
            </MLCard>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Google-Style Dot Navigation */}
      <div 
        className="glue-carousel__navigation flex justify-center items-center space-x-2 p-1"
        role="tablist"
        aria-label="Choose testimonial to display"
      >
        {testimonials.map((_, index) => {
          const isActive = index === current;
          
          return (
            <motion.button
              key={index}
              className={`
                glue-carousel__dot h-1.5 rounded-full transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]
                border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background
                ${isActive 
                  ? 'glue-is-active bg-on-surface w-5' 
                  : 'bg-on-surface/40 hover:bg-on-surface/60 w-1.5'
                }
              `.trim()}
              data-dot={index + 1}
              aria-controls={`testimonial-${currentTestimonial.id}`}
              aria-labelledby={`testimonial-${currentTestimonial.id}`}
              aria-selected={isActive}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleDotClick(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">
                View testimonial from {testimonials[index].author}
                {isActive ? ' (current)' : ''}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Progress indicator for auto-rotation */}
      {autoRotate && !isPaused && testimonials.length > 1 && (
        <div className="relative mt-4">
          <motion.div
            className="h-0.5 bg-primary/20 rounded-full"
            style={{ width: '100%' }}
          >
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ 
                duration: autoRotateInterval / 1000,
                ease: 'linear',
                repeat: Infinity 
              }}
              key={current} // Reset animation when slide changes
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};