import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button } from './UI';

interface VeoServiceCardProps {
  title: string;
  description: string;
  features: string[];
  price?: string;
  icon?: ReactNode;
  badge?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

export const VeoServiceCard = ({
  title,
  description,
  features,
  price,
  icon,
  badge,
  ctaText = 'Get Started',
  onCtaClick,
  variant = 'default',
  className = ''
}: VeoServiceCardProps) => {
  const cardVariants = {
    default: 'p-8',
    featured: 'p-8 border-2 border-blue-500 relative',
    compact: 'p-6'
  };

  return (
    <motion.div
      className={`
        relative bg-white rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col
        ${cardVariants[variant]} ${className}
      `}
      style={{ 
        boxShadow: variant === 'featured' ? 'var(--veo-shadow-xl)' : 'var(--veo-shadow-md)' 
      }}
      whileHover={{ 
        y: -8,
        boxShadow: 'var(--veo-card-hover-shadow)'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Featured Badge */}
      {variant === 'featured' && (
        <motion.div
          className="absolute -top-3 left-1/2 transform -translate-x-1/2"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-veo font-medium">
            Most Popular
          </span>
        </motion.div>
      )}

      {/* Custom Badge */}
      {badge && variant !== 'featured' && (
        <div className="absolute top-4 right-4">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-veo font-medium">
            {badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex-grow">
        {/* Icon */}
        {icon && (
          <motion.div
            className="w-12 h-12 mb-6 text-blue-500"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
        )}

        {/* Title */}
        <h3 className="font-veo text-veo-text-title font-semibold text-gray-900 mb-4">
          {title}
        </h3>

        {/* Description */}
        <p className="font-veo text-veo-text-body text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Features List */}
        {features.length > 0 && (
          <motion.ul 
            className="space-y-3 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <motion.div
                  className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"
                  whileHover={{ scale: 1.3 }}
                  transition={{ duration: 0.2 }}
                />
                <span className="font-veo text-veo-text-body text-gray-700 leading-relaxed">
                  {feature}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto">
        {/* Price */}
        {price && (
          <div className="border-t border-gray-100 pt-6 mb-6">
            <span className="font-veo text-veo-text-body text-gray-600">
              {price}
            </span>
          </div>
        )}

        {/* CTA Button */}
        <Button
          variant={variant === 'featured' ? 'filled' : 'outlined'}
          size="md"
          onClick={onCtaClick}
          className={`
            w-full font-veo font-medium transition-all duration-200
            ${variant === 'featured' 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500'
            }
          `}
        >
          {ctaText}
        </Button>
      </div>

      {/* Hover Effect Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 pointer-events-none"
        whileHover={{ opacity: variant === 'featured' ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Service Icons (using simple SVG icons)
export const ServiceIcons = {
  Strategy: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Development: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  Team: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Automation: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  Analytics: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Consulting: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};