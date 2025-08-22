import { motion } from 'framer-motion';
import { type ReactNode, forwardRef } from 'react';
import { elevateCard } from '../../styles/motion';

interface MLCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'filled' | 'elevated' | 'outlined' | 'glow-primary' | 'glow-ion' | 'glow-secondary';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  noise?: boolean;
  onClick?: () => void;
}

export const MLCard = forwardRef<HTMLDivElement, MLCardProps>(({
  children,
  className = '',
  variant = 'filled',
  padding = 'md',
  hover = true,
  noise = false,
  onClick,
  ...props
}, ref) => {
  const baseClasses = 'rounded-lg transition-all duration-base';

  const variantClasses = {
    filled: 'bg-surface-1 border border-outline-variant',
    elevated: 'bg-surface shadow-elevation-1 hover:shadow-elevation-2',
    outlined: 'bg-surface border border-outline',
    'glow-ion': 'glow-gradient-ion border border-outline-variant/50',
    'glow-primary': 'glow-gradient-primary border border-outline-variant/50',
    'glow-secondary': 'glow-gradient-secondary border border-outline-variant/50'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const isInteractive = Boolean(onClick);
  const isGlowVariant = variant.startsWith('glow-');
  const hoverClasses = hover && isInteractive && !isGlowVariant ? 'cursor-pointer hover:shadow-elevation-2' : '';
  const noiseClasses = noise || isGlowVariant ? 'glow-noise' : '';

  return (
    <motion.div
      ref={ref}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${hoverClasses}
        ${noiseClasses}
        ${isInteractive ? 'cursor-pointer' : ''}
        ${className}
      `}
      variants={hover && isInteractive ? elevateCard : undefined}
      initial="initial"
      whileHover={hover && isInteractive ? "hover" : undefined}
      whileTap={isInteractive ? "tap" : undefined}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
});

MLCard.displayName = 'MLCard';