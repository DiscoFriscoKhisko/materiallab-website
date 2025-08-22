import { motion } from 'framer-motion';

interface VeoCarouselDotsProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

export const VeoCarouselDots = ({ total, current, onChange }: VeoCarouselDotsProps) => {
  if (total <= 1) return null;

  return (
    <div 
      className="veo-carousel-dots flex items-center gap-2 p-2"
      role="tablist"
      aria-label="Carousel navigation"
    >
      {Array.from({ length: total }, (_, index) => {
        const isActive = index === current;
        
        return (
          <motion.button
            key={index}
            className={`
              relative h-1.5 rounded-full transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]
              border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background
              ${isActive 
                ? 'bg-on-surface w-6' 
                : 'bg-on-surface/40 hover:bg-on-surface/60 w-1.5'
              }
            `.trim()}
            onClick={() => onChange(index)}
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${index + 1}${isActive ? ' (current)' : ''}`}
            tabIndex={isActive ? 0 : -1}
            whileHover={{ 
              opacity: isActive ? 1 : 0.8,
              scale: 1.1,
              transition: { duration: 0.15 }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
            animate={{
              width: isActive ? 24 : 6,
              transition: {
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
          >
            {/* Active state glow */}
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-full -z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1]
                }}
              />
            )}

            {/* Ripple effect on click */}
            <motion.div
              className="absolute inset-0 bg-primary/30 rounded-full pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              whileTap={{ 
                scale: 2,
                opacity: [0.3, 0],
                transition: { duration: 0.4, ease: 'easeOut' }
              }}
            />
          </motion.button>
        );
      })}
    </div>
  );
};