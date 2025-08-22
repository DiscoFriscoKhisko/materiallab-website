import { motion } from 'framer-motion';
import { type ReactNode, type ButtonHTMLAttributes, forwardRef } from 'react';
import { useFocusVisible } from '../../hooks/useAccessibility';

interface MLButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
  size?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'hover' | 'active' | 'disabled' | 'loading';
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}

export const MLButton = forwardRef<HTMLButtonElement, MLButtonProps>(({
  children,
  className = '',
  variant = 'filled',
  size = 'md',
  state = 'default',
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled,
  ...props
}, ref) => {
  const isFocusVisible = useFocusVisible();
  const baseClasses = `relative overflow-hidden font-primary rounded-lg transition-all duration-200 ease-out transform-gpu inline-flex items-center justify-center gap-2 select-none group keyboard-navigation ${isFocusVisible ? 'focus-visible' : ''}`;

  // Check if using ML design system classes
  const isUsingMLClasses = className.includes('ml-btn-');
  
  const variantClasses = {
    filled: isUsingMLClasses ? '' : 'bg-primary text-on-primary shadow-sm hover:shadow-md hover:bg-primary/95 active:bg-primary/90 active:shadow-sm tracking-button font-weight-button transition-all duration-200 ease-out',
    elevated: isUsingMLClasses ? '' : 'bg-surface text-on-surface shadow-sm hover:shadow-md hover:bg-surface/95 active:bg-surface/90 active:shadow-sm tracking-button font-weight-button transition-all duration-200 ease-out',
    tonal: isUsingMLClasses ? '' : 'bg-secondary-container text-on-secondary-container hover:bg-secondary-container/90 active:bg-secondary-container/80 tracking-button font-weight-button transition-all duration-200 ease-out',
    outlined: isUsingMLClasses ? '' : 'border border-outline text-on-surface hover:bg-on-surface/5 active:bg-on-surface/10 hover:border-outline/60 tracking-button font-weight-button transition-all duration-200 ease-out',
    text: isUsingMLClasses ? '' : 'text-primary hover:bg-primary/5 active:bg-primary/10 tracking-button font-weight-button transition-all duration-200 ease-out'
  };

  const sizeClasses = {
    sm: isUsingMLClasses ? '' : 'px-3 py-1.5 text-sm min-h-[32px]',  /* Compact - 8px grid */
    md: isUsingMLClasses ? '' : 'px-4 py-2 text-sm min-h-[36px]',    /* Standard - 8px grid */
    lg: isUsingMLClasses ? '' : 'px-6 py-2.5 text-base min-h-[40px]' /* Large - 8px grid */
  };

  const stateClasses = {
    default: '',
    hover: '',
    active: 'scale-[0.98]',
    disabled: 'opacity-40 cursor-not-allowed pointer-events-none',
    loading: 'cursor-wait'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const isDisabled = disabled || state === 'disabled' || state === 'loading';

  return (
    <motion.button
      ref={ref}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${stateClasses[state]}
        ${widthClass}
        ${className}
      `}
      whileHover={!isDisabled ? { scale: 1.01 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={isDisabled}
      {...(props as any)}
    >
      {/* Loading spinner */}
      {state === 'loading' && (
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
      <span className={`flex items-center gap-2 ${state === 'loading' ? 'opacity-0' : 'opacity-100'}`}>
        {iconLeft && (
          <motion.span 
            className="flex-shrink-0" 
            whileHover={{ x: -1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {iconLeft}
          </motion.span>
        )}
        {children}
        {iconRight && (
          <motion.span 
            className="flex-shrink-0" 
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {iconRight}
          </motion.span>
        )}
      </span>

      {/* Subtle ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-lg overflow-hidden"
        style={{ pointerEvents: 'none' }}
      >
        <motion.div
          className="absolute inset-0 bg-white/10 rounded-lg"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        />
      </motion.div>
    </motion.button>
  );
});

MLButton.displayName = 'MLButton';