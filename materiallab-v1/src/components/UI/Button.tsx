import { motion } from 'framer-motion';
import { type ReactNode, type ButtonHTMLAttributes, forwardRef } from 'react';
import { useFocusVisible } from '../../hooks/useAccessibility';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className = '',
  variant = 'filled',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled,
  href,
  ...props
}, ref) => {
  const isFocusVisible = useFocusVisible();
  
  const baseClasses = `
    relative inline-flex items-center justify-center gap-2
    font-medium font-primary rounded-full
    transition-all duration-200 ease-out transform-gpu
    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    select-none overflow-hidden
    ${isFocusVisible ? 'focus-visible' : ''}
  `;

  const variantClasses = {
    filled: `
      bg-primary text-on-primary
      shadow-sm hover:shadow-md hover:bg-primary/95
      active:bg-primary/90 active:shadow-sm
    `,
    outlined: `
      border border-outline text-on-surface
      hover:bg-on-surface/5 active:bg-on-surface/10
      hover:border-outline/60
    `,
    text: `
      text-primary hover:bg-primary/5 active:bg-primary/10
    `,
    elevated: `
      bg-surface text-on-surface
      shadow-sm hover:shadow-md hover:bg-surface/95
      active:bg-surface/90 active:shadow-sm
    `,
    ghost: `
      text-on-surface hover:bg-surface-1
      active:bg-surface-2
    `
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm min-h-[32px]',
    md: 'px-4 py-2 text-sm min-h-[36px]',
    lg: 'px-6 py-2.5 text-base min-h-[40px]'
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const isDisabled = disabled || loading;

  return (
    <motion.button
      ref={ref}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${className}
      `}
      whileHover={!isDisabled ? { scale: 1.01 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={isDisabled}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}

      {/* Content */}
      <span className={`flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {icon && iconPosition === 'left' && (
          <motion.span 
            className="flex-shrink-0" 
            whileHover={{ x: -1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {icon}
          </motion.span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <motion.span 
            className="flex-shrink-0" 
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {icon}
          </motion.span>
        )}
      </span>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
      >
        <motion.div
          className="absolute inset-0 bg-white/10 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        />
      </motion.div>
    </motion.button>
  );
});

Button.displayName = 'Button';