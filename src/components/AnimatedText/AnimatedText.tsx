import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { usePrefersReducedMotion } from '../../utils/hooks';

interface AnimatedTextProps {
  children: string;
  className?: string;
  variant?: 'fadeUp' | 'stagger' | 'typewriter' | 'gradient' | 'glitch';
  delay?: number;
  duration?: number;
}

export const AnimatedText = ({ 
  children, 
  className = '', 
  variant = 'fadeUp',
  delay = 0,
  duration = 0.8 
}: AnimatedTextProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const words = children.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: variant === 'stagger' ? 0.1 : 0,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    fadeUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration, ease: 'easeOut' } 
      },
    },
    stagger: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.5, ease: 'easeOut' } 
      },
    },
    typewriter: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.1, ease: 'easeOut' } 
      },
    },
  };

  if (variant === 'gradient') {
    return (
      <motion.div
        className={`${className} text-gradient`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration, delay, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    );
  }

  if (variant === 'glitch') {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration, delay }}
      >
        <motion.span
          animate={{
            x: [0, -2, 2, 0],
            textShadow: [
              '0 0 0 transparent',
              '2px 0 0 #ff0000, -2px 0 0 #00ffff',
              '0 0 0 transparent'
            ]
          }}
          transition={{
            x: { duration: 0.1, repeat: 3, delay: delay + duration },
            textShadow: { duration: 0.1, repeat: 3, delay: delay + duration }
          }}
        >
          {children}
        </motion.span>
      </motion.div>
    );
  }

  if (variant === 'stagger') {
    return (
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={itemVariants[variant]}
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (variant === 'typewriter') {
    return (
      <motion.div className={className}>
        {words.map((word, wordIndex) => (
          <motion.span key={wordIndex} className="inline-block mr-2">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={itemVariants[variant]}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: delay + (wordIndex * word.length + charIndex) * 0.05,
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={itemVariants[variant]}
      initial="hidden"
      animate="visible"
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};