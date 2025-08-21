import { motion } from 'framer-motion';
import { type ReactNode, forwardRef } from 'react';
import { elevateCard } from '../../styles/motion';

interface MLCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'filled' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export const MLCard = forwardRef<HTMLDivElement, MLCardProps>(({
  children,
  className = '',
  variant = 'filled',
  padding = 'md',
  hover = true,
  onClick,
  ...props
}, ref) => {
  const baseClasses = 'rounded-lg transition-all duration-base';

  const variantClasses = {
    filled: 'bg-surface-1 border border-outline-variant',
    elevated: 'bg-surface shadow-elevation-1 hover:shadow-elevation-2',
    outlined: 'bg-surface border border-outline'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const isInteractive = Boolean(onClick);
  const hoverClasses = hover && isInteractive ? 'cursor-pointer hover:shadow-elevation-2' : '';

  return (
    <motion.div
      ref={ref}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${hoverClasses}
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