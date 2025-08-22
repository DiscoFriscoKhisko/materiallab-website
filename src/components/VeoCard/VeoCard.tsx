import { motion } from 'framer-motion';
import { type ReactNode, forwardRef } from 'react';

interface VeoCardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const VeoCard = forwardRef<HTMLDivElement, VeoCardProps>(({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  interactive = false,
  className = '',
  onClick,
  ...props
}, ref) => {
  const baseClasses = `
    relative rounded-xl overflow-hidden
    transition-all duration-200 ease-out
    ${interactive || onClick ? 'cursor-pointer' : ''}
  `;

  // Variant styles matching Veo design
  const variantClasses = {
    default: `
      bg-surface border border-outline/20
      hover:border-outline/40 hover:shadow-sm
    `,
    elevated: `
      bg-surface shadow-md
      hover:shadow-lg hover:-translate-y-1
    `,
    outlined: `
      bg-transparent border border-outline
      hover:border-outline-variant hover:bg-surface/50
    `,
    filled: `
      bg-surface-1
      hover:bg-surface-2 hover:shadow-sm
    `
  };

  // Padding classes
  const paddingClasses = {
    none: '',
    sm: 'p-4',     // 16px
    md: 'p-6',     // 24px
    lg: 'p-8',     // 32px
    xl: 'p-12'     // 48px
  };

  // Interactive hover effects
  const hoverClasses = hover ? `
    hover:shadow-lg hover:-translate-y-1
    transition-all duration-300 ease-out
  ` : '';

  const cardContent = (
    <div className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );

  if (interactive || onClick) {
    return (
      <motion.div
        ref={ref}
        onClick={onClick}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {cardContent}
      </motion.div>
    );
  }

  if (hover) {
    return (
      <motion.div
        ref={ref}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        {...props}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <div ref={ref} {...props}>
      {cardContent}
    </div>
  );
});

VeoCard.displayName = 'VeoCard';

// Feature card for showcasing features/services
interface VeoFeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  image?: string;
  features?: string[];
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export const VeoFeatureCard = ({
  title,
  description,
  icon,
  image,
  features = [],
  action,
  className = ''
}: VeoFeatureCardProps) => {
  return (
    <VeoCard variant="elevated" hover className={className}>
      {/* Image/Icon header */}
      {(image || icon) && (
        <div className="relative mb-6">
          {image ? (
            <div className="aspect-video rounded-lg overflow-hidden bg-surface-2">
              <img 
                src={image} 
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ) : icon && (
            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
              <div className="text-primary text-2xl">
                {icon}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="space-y-4">
        <div>
          <h3 className="veo-h3 text-on-surface mb-2">{title}</h3>
          <p className="veo-body text-on-surface-variant leading-relaxed">
            {description}
          </p>
        </div>

        {/* Features list */}
        {features.length > 0 && (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg 
                  className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span className="veo-body text-on-surface-variant">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Action */}
        {action && (
          <div className="pt-4">
            {action.href ? (
              <a 
                href={action.href}
                className="inline-flex items-center gap-2 font-medium text-primary hover:text-primary-hover transition-colors"
              >
                {action.label}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ) : (
              <button 
                onClick={action.onClick}
                className="inline-flex items-center gap-2 font-medium text-primary hover:text-primary-hover transition-colors"
              >
                {action.label}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </VeoCard>
  );
};

// Stats card for displaying metrics
interface VeoStatsCardProps {
  value: string | number;
  label: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: ReactNode;
  className?: string;
}

export const VeoStatsCard = ({
  value,
  label,
  trend,
  icon,
  className = ''
}: VeoStatsCardProps) => {
  return (
    <VeoCard variant="filled" padding="lg" className={className}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="veo-h1 font-bold text-on-surface">{value}</div>
          <div className="veo-body text-on-surface-variant">{label}</div>
          
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${
              trend.isPositive ? 'text-success' : 'text-error'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {trend.isPositive ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                )}
              </svg>
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        
        {icon && (
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>
    </VeoCard>
  );
};

// Testimonial card
interface VeoTestimonialCardProps {
  quote: string;
  author: {
    name: string;
    role: string;
    company: string;
    avatar?: string;
  };
  rating?: number;
  className?: string;
}

export const VeoTestimonialCard = ({
  quote,
  author,
  rating,
  className = ''
}: VeoTestimonialCardProps) => {
  return (
    <VeoCard variant="elevated" padding="lg" className={className}>
      <div className="space-y-6">
        {/* Rating */}
        {rating && (
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        )}

        {/* Quote */}
        <blockquote className="veo-body text-on-surface leading-relaxed">
          "{quote}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4">
          {author.avatar ? (
            <img 
              src={author.avatar} 
              alt={author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-medium">
                {author.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
          
          <div>
            <div className="font-medium text-on-surface">{author.name}</div>
            <div className="text-sm text-on-surface-variant">
              {author.role} at {author.company}
            </div>
          </div>
        </div>
      </div>
    </VeoCard>
  );
};