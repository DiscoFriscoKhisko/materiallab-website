import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { MLButton } from './Button';
import { MLText } from './Typography';
import { type ReactNode } from 'react';

interface MLPageCoverProps {
  title: ReactNode;
  description?: ReactNode;
  media?: {
    src: string;
    alt?: string;
    sources?: Array<{
      media: string;
      type: string;
      width: number;
      height: number;
      srcSet: string;
    }>;
  };
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: 'filled' | 'outlined' | 'text';
  };
  layout?: 'centered' | 'split' | 'full';
  background?: 'default' | 'gradient' | 'image';
  className?: string;
  children?: ReactNode;
}

export const MLPageCover = ({
  title,
  description,
  media,
  action,
  layout = 'centered',
  background = 'default',
  className = '',
  children,
}: MLPageCoverProps) => {
  const { ref: inViewRef, isInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const layoutClasses = {
    centered: 'page-cover__content--centered',
    split: 'page-cover__content--split',
    full: 'page-cover__content--full',
  };

  const backgroundClasses = {
    default: 'bg-surface',
    gradient: 'bg-gradient-to-br from-surface via-surface-1 to-surface-2',
    image: 'relative bg-surface overflow-hidden',
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    },
  };

  const mediaVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, delay: 0.2 }
    },
  };

  return (
    <motion.div
      ref={inViewRef as any}
      className={`
        page-cover glue-grid page-cover--full py-16 lg:py-24
        ${backgroundClasses[background]}
        ${className}
      `.trim()}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Background overlay for image backgrounds */}
      {background === 'image' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-surface/90 via-surface/70 to-transparent"
          variants={itemVariants}
        />
      )}

      {/* Content Container */}
      <div className={`
        page-cover__content glue-grid__col glue-grid__col--span-12 glue-grid__col--span-12-md
        ${layoutClasses[layout]} relative z-10
        ${layout === 'centered' ? 'page-cover__content--mono text-center max-w-4xl mx-auto px-4' : 'grid lg:grid-cols-2 gap-12 items-center px-4 lg:px-8'}
      `.trim()}>
        
        {/* Text Content */}
        <div className={layout === 'split' ? 'lg:pr-8' : ''}>
          {/* Title */}
          <motion.div variants={itemVariants}>
            <MLText 
              variant="headline" 
              as="h2" 
              className="page-cover__title glue-headline glue-headline--headline-2 mb-6"
            >
              {title}
            </MLText>
          </motion.div>

          {/* Description */}
          {description && (
            <motion.div 
              className="page-cover__description mb-8"
              variants={itemVariants}
            >
              <MLText variant="body" color="weak" className="max-w-2xl">
                {description}
              </MLText>
            </motion.div>
          )}

          {/* Action Button */}
          {action && (
            <motion.div variants={itemVariants}>
              <MLButton
                variant={action.variant || 'filled'}
                size="lg"
                className="button glue-button glue-button--high-emphasis"
                onClick={action.onClick}
                {...(action.href && { 
                  as: 'a', 
                  href: action.href,
                  target: action.href.startsWith('http') ? '_blank' : undefined,
                  rel: action.href.startsWith('http') ? 'noopener noreferrer' : undefined
                })}
                data-gtm-tag="cta-selection"
                role="button"
              >
                <span className="button__text">{action.label}</span>
              </MLButton>
            </motion.div>
          )}

          {/* Custom children content */}
          {children && (
            <motion.div variants={itemVariants} className="mt-8">
              {children}
            </motion.div>
          )}
        </div>

        {/* Media Content */}
        {media && (
          <motion.div
            className={`
              page-cover__media 
              ${layout === 'centered' ? 'mt-12' : ''} 
              ${layout === 'split' ? 'glue-grid__col glue-grid__col--span-12 glue-grid__col--span-12-md' : ''}
            `.trim()}
            variants={mediaVariants}
          >
            <div className="relative overflow-hidden rounded-xl shadow-elevation-2">
              <picture className="picture page-cover__image block w-full">
                {/* Responsive sources */}
                {media.sources?.map((source, index) => (
                  <source
                    key={index}
                    media={source.media}
                    type={source.type}
                    width={source.width}
                    height={source.height}
                    srcSet={source.srcSet}
                  />
                ))}
                
                {/* Main image */}
                <motion.img
                  src={media.src}
                  alt={media.alt || ''}
                  className="picture__image w-full h-auto object-cover"
                  loading="lazy"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.4 }
                  }}
                />
              </picture>

              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};