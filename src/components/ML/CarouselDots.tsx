import { motion } from 'framer-motion';
import { useEffect, useState, type KeyboardEvent } from 'react';

interface MLCarouselDotsProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
  ariaControls?: string;
  ariaLabelledBy?: string;
  autoRotate?: boolean;
  autoRotateInterval?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MLCarouselDots = ({
  total,
  current,
  onChange,
  ariaControls,
  ariaLabelledBy,
  autoRotate = false,
  autoRotateInterval = 5000,
  className = '',
  size = 'md',
}: MLCarouselDotsProps) => {
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotation logic
  useEffect(() => {
    if (!autoRotate || isPaused) return;

    const interval = setInterval(() => {
      onChange((current + 1) % total);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [autoRotate, current, total, onChange, autoRotateInterval, isPaused]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const { key } = event;
    
    switch (key) {
      case 'ArrowLeft':
        event.preventDefault();
        onChange(index > 0 ? index - 1 : total - 1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        onChange(index < total - 1 ? index + 1 : 0);
        break;
      case 'Home':
        event.preventDefault();
        onChange(0);
        break;
      case 'End':
        event.preventDefault();
        onChange(total - 1);
        break;
    }
  };

  const sizeClasses = {
    sm: {
      dot: 'w-1 h-1',
      active: 'w-3 h-1',
      container: 'gap-1.5 p-1',
    },
    md: {
      dot: 'w-1.5 h-1.5',
      active: 'w-5 h-1.5',
      container: 'gap-2 p-1.5',
    },
    lg: {
      dot: 'w-2 h-2',
      active: 'w-6 h-2',
      container: 'gap-2.5 p-2',
    },
  };

  const { dot, active, container } = sizeClasses[size];

  return (
    <div
      className={`glue-carousel__dots flex items-center justify-center ${container} ${className}`}
      role="tablist"
      aria-label="Carousel navigation"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {Array.from({ length: total }, (_, index) => {
        const isActive = index === current;
        
        return (
          <motion.button
            key={index}
            className={`
              glue-carousel__dot relative rounded-full border-0 cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background
              transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${isActive 
                ? `glue-is-active bg-on-surface ${active}` 
                : `bg-on-surface/40 hover:bg-on-surface/60 ${dot}`
              }
            `.trim()}
            data-dot={index}
            aria-controls={ariaControls}
            aria-labelledby={ariaLabelledBy}
            aria-selected={isActive}
            role="tab"
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            whileHover={{ 
              opacity: isActive ? 1 : 0.8,
              transition: { duration: 0.15 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            <span className="sr-only">
              {`Go to slide ${index + 1}${isActive ? ' (current)' : ''}`}
            </span>

            {/* Active state glow effect */}
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 1 }}
                transition={{ 
                  duration: 0.3, 
                   
                }}
              />
            )}

            {/* Ripple effect on click */}
            <motion.div
              className="absolute inset-0 bg-primary/30 rounded-full"
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

      {/* Progress indicator for auto-rotation */}
      {autoRotate && !isPaused && (
        <motion.div
          className="absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ 
            duration: autoRotateInterval / 1000,
            ease: 'linear',
            repeat: Infinity 
          }}
          key={current} // Reset animation when slide changes
        />
      )}
    </div>
  );
};