import { motion } from 'framer-motion';
import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef, useState } from 'react';

// Base Input Component
interface VeoInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helper?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'ghost';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const VeoInput = forwardRef<HTMLInputElement, VeoInputProps>(({
  label,
  error,
  helper,
  size = 'md',
  variant = 'default',
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-3 text-base min-h-[48px]',  // Match button height
    lg: 'px-6 py-4 text-lg min-h-[56px]'
  };

  const variantClasses = {
    default: `
      bg-surface border border-outline
      hover:border-outline-variant focus:border-primary
      focus:ring-2 focus:ring-primary/20
    `,
    filled: `
      bg-surface-1 border border-transparent
      hover:bg-surface-2 focus:bg-surface focus:border-primary
      focus:ring-2 focus:ring-primary/20
    `,
    ghost: `
      bg-transparent border-b border-outline
      hover:border-outline-variant focus:border-primary
      focus:ring-0 rounded-none
    `
  };

  const hasError = !!error;

  return (
    <div className={className}>
      {label && (
        <motion.label 
          className="block veo-caption font-medium text-on-surface mb-2"
          animate={{ 
            color: isFocused ? 'var(--primary)' : hasError ? 'var(--error)' : 'var(--on-surface-variant)' 
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
            {icon}
          </div>
        )}
        
        <motion.input
          ref={ref}
          className={`
            w-full font-primary text-on-surface placeholder:text-on-surface-variant
            rounded-xl transition-all duration-200 ease-out
            focus:outline-none veo-focus-ring
            disabled:opacity-50 disabled:cursor-not-allowed
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${hasError ? 'border-error focus:border-error focus:ring-error/20' : ''}
            ${icon && iconPosition === 'left' ? 'pl-10' : ''}
            ${icon && iconPosition === 'right' ? 'pr-10' : ''}
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
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
            {icon}
          </div>
        )}
      </div>
      
      {(error || helper) && (
        <motion.p 
          className={`mt-2 veo-caption ${error ? 'text-error' : 'text-on-surface-variant'}`}
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

VeoInput.displayName = 'VeoInput';

// Textarea Component
interface VeoTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'ghost';
}

export const VeoTextarea = forwardRef<HTMLTextAreaElement, VeoTextareaProps>(({
  label,
  error,
  helper,
  size = 'md',
  variant = 'default',
  className = '',
  disabled,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[96px]',
    md: 'px-4 py-3 text-base min-h-[120px]',
    lg: 'px-6 py-4 text-lg min-h-[144px]'
  };

  const variantClasses = {
    default: `
      bg-surface border border-outline
      hover:border-outline-variant focus:border-primary
      focus:ring-2 focus:ring-primary/20
    `,
    filled: `
      bg-surface-1 border border-transparent
      hover:bg-surface-2 focus:bg-surface focus:border-primary
      focus:ring-2 focus:ring-primary/20
    `,
    ghost: `
      bg-transparent border-b border-outline
      hover:border-outline-variant focus:border-primary
      focus:ring-0 rounded-none
    `
  };

  const hasError = !!error;

  return (
    <div className={className}>
      {label && (
        <motion.label 
          className="block veo-caption font-medium text-on-surface mb-2"
          animate={{ 
            color: isFocused ? 'var(--primary)' : hasError ? 'var(--error)' : 'var(--on-surface-variant)' 
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      
      <motion.textarea
        ref={ref}
        className={`
          w-full font-primary text-on-surface placeholder:text-on-surface-variant
          rounded-xl transition-all duration-200 ease-out resize-none
          focus:outline-none veo-focus-ring
          disabled:opacity-50 disabled:cursor-not-allowed
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${hasError ? 'border-error focus:border-error focus:ring-error/20' : ''}
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
        {...props}
      />
      
      {(error || helper) && (
        <motion.p 
          className={`mt-2 veo-caption ${error ? 'text-error' : 'text-on-surface-variant'}`}
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

VeoTextarea.displayName = 'VeoTextarea';

// Select Component
interface VeoSelectProps extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helper?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'ghost';
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const VeoSelect = forwardRef<HTMLSelectElement, VeoSelectProps>(({
  label,
  error,
  helper,
  size = 'md',
  variant = 'default',
  options,
  placeholder,
  className = '',
  disabled,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-3 text-base min-h-[48px]',
    lg: 'px-6 py-4 text-lg min-h-[56px]'
  };

  const variantClasses = {
    default: `
      bg-surface border border-outline
      hover:border-outline-variant focus:border-primary
      focus:ring-2 focus:ring-primary/20
    `,
    filled: `
      bg-surface-1 border border-transparent
      hover:bg-surface-2 focus:bg-surface focus:border-primary
      focus:ring-2 focus:ring-primary/20
    `,
    ghost: `
      bg-transparent border-b border-outline
      hover:border-outline-variant focus:border-primary
      focus:ring-0 rounded-none
    `
  };

  const hasError = !!error;

  return (
    <div className={className}>
      {label && (
        <motion.label 
          className="block veo-caption font-medium text-on-surface mb-2"
          animate={{ 
            color: isFocused ? 'var(--primary)' : hasError ? 'var(--error)' : 'var(--on-surface-variant)' 
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        <motion.select
          ref={ref as any}
          className={`
            w-full font-primary text-on-surface
            rounded-xl transition-all duration-200 ease-out
            focus:outline-none veo-focus-ring
            disabled:opacity-50 disabled:cursor-not-allowed
            appearance-none cursor-pointer
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${hasError ? 'border-error focus:border-error focus:ring-error/20' : ''}
          `}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e as any);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e as any);
          }}
          disabled={disabled}
          whileFocus={{ scale: 1.01 }}
          {...(props as any)}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </motion.select>
        
        {/* Dropdown arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {(error || helper) && (
        <motion.p 
          className={`mt-2 veo-caption ${error ? 'text-error' : 'text-on-surface-variant'}`}
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

VeoSelect.displayName = 'VeoSelect';

// Form wrapper component
interface VeoFormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

export const VeoForm = ({ children, onSubmit, className = '' }: VeoFormProps) => {
  return (
    <form 
      onSubmit={onSubmit}
      className={`space-y-6 ${className}`}
      noValidate
    >
      {children}
    </form>
  );
};