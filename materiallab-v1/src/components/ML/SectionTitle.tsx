import { motion } from 'framer-motion';
import { useInViewStates } from '../../hooks/useInView';
import { MLText } from './Typography';
import { type ReactNode, forwardRef } from 'react';

interface MLSectionTitleProps {
  children: ReactNode;
  subtitle?: ReactNode;
  variant?: 'display' | 'headline' | 'title' | 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center' | 'right';
  className?: string;
  id?: string;
  animate?: boolean;
}

export const MLSectionTitle = forwardRef<HTMLElement, MLSectionTitleProps>(({
  children,
  subtitle,
  variant = 'headline',
  align = 'left',
  className = '',
  id,
  animate = true,
  ...props
}, ref) => {
  const { ref: inViewRef, viewState, isInView, classes } = useInViewStates({
    threshold: 0.2,
    rootMargin: '0px 0px -20% 0px',
  });

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const containerClasses = `
    section-title
    ${animate ? classes : 'gemini-in-view-element--in-view'}
    ${alignClasses[align]}
    ${className}
  `.trim();

  // Animation variants
  const titleVariants = {
    'out-view-top': { 
      opacity: 0, 
      y: 30,
    },
    'in-view': { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: 0.1
      }
    },
    'out-view-bottom': { 
      opacity: 0.3, 
      y: -10,
    },
  };

  const subtitleVariants = {
    'out-view-top': { 
      opacity: 0, 
      y: 20,
    },
    'in-view': { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: 0.3
      }
    },
    'out-view-bottom': { 
      opacity: 0.3, 
      y: -10,
    },
  };

  // Combine refs
  const combinedRef = (node: HTMLElement | null) => {
    if (inViewRef && typeof inViewRef !== 'function') {
      inViewRef.current = node;
    }
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };

  return (
    <div 
      ref={combinedRef as any}
      className={containerClasses}
      id={id}
      data-in-view={isInView ? '' : undefined}
      {...props}
    >
      {/* Main title */}
      <motion.div
        animate={animate ? viewState : 'in-view'}
        variants={animate ? titleVariants : undefined}
        initial={animate ? 'out-view-top' : false}
      >
        <MLText 
          variant={variant}
          className="section-title__title"
          as={variant === 'display' ? 'h1' : variant === 'headline' ? 'h2' : variant as any}
        >
          {children}
        </MLText>
      </motion.div>

      {/* Subtitle */}
      {subtitle && (
        <motion.div
          animate={animate ? viewState : 'in-view'}
          variants={animate ? subtitleVariants : undefined}
          initial={animate ? 'out-view-top' : false}
          className="mt-4"
        >
          <MLText 
            variant="body" 
            color="weak"
            className="section-title__subtitle max-w-2xl"
          >
            {subtitle}
          </MLText>
        </motion.div>
      )}

      {/* Decorative line for centered titles */}
      {align === 'center' && (
        <motion.div
          className="flex justify-center mt-6"
          animate={animate ? viewState : 'in-view'}
          variants={animate ? {
            'out-view-top': { 
              opacity: 0, 
              scale: 0,
              transition: { duration: 0.3,  }
            },
            'in-view': { 
              opacity: 1, 
              scale: 1,
              transition: { 
                duration: 0.4, 
                        delay: 0.5
              }
            },
            'out-view-bottom': { 
              opacity: 0.3, 
              scale: 0.8,
              transition: { duration: 0.3,  }
            },
          } : undefined}
          initial={animate ? 'out-view-top' : false}
        >
          <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>
      )}
    </div>
  );
});

MLSectionTitle.displayName = 'MLSectionTitle';