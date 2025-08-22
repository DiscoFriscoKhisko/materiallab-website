import { motion } from 'framer-motion';
import { type InputHTMLAttributes, forwardRef, useState } from 'react';

interface MLInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helper?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'filled';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const MLInput = forwardRef<HTMLInputElement, MLInputProps>(({
  label,
  error,
  helper,
  size = 'md',
  variant = 'default',
  iconLeft,
  iconRight,
  className = '',
  disabled,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);


  const variantClasses = {
    default: 'bg-surface border border-glass-light hover:border-ion-subtle focus:border-ion focus:bg-surface-2',
    ghost: 'bg-transparent border-b border-glass-light hover:border-ion-subtle focus:border-ion focus:bg-glass-light',
    filled: 'bg-surface-2 border border-transparent hover:bg-surface-3 focus:border-ion focus:bg-surface'
  };

  const baseClasses = 'w-full font-primary text-text placeholder:text-text-weaker rounded-lg transition-all duration-base focus:outline-none focus:ring-2 focus:ring-ion focus:ring-offset-2 focus:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed';

  const hasError = !!error;

  return (
    <div className={className}>
      {label && (
        <motion.label 
          className="block text-body-s font-medium text-text-weak mb-1"
          animate={{ 
            color: isFocused ? 'var(--interactive-accent)' : hasError ? 'var(--error)' : 'var(--text-weak)' 
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        {iconLeft && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-weaker">
            {iconLeft}
          </div>
        )}
        
        <motion.input
          ref={ref}
          className={`
            ${baseClasses}
            ${variantClasses[variant]}
            ${hasError ? 'border-error focus:border-error focus:ring-error' : ''}
            ${iconLeft ? 'pl-10' : ''}
            ${iconRight ? 'pr-10' : ''}
          `}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          disabled={disabled}
          whileFocus={{ scale: 1.01 }}
          {...(props as any)}
        />
        
        {iconRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-weaker">
            {iconRight}
          </div>
        )}
      </div>
      
      {(error || helper) && (
        <motion.p 
          className={`mt-1 text-body-s ${error ? 'text-error' : 'text-text-weaker'}`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error || helper}
        </motion.p>
      )}
    </div>
  );
});

MLInput.displayName = 'MLInput';