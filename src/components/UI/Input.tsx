import { motion } from 'framer-motion';
import { 
  type InputHTMLAttributes, 
  type TextareaHTMLAttributes, 
  type SelectHTMLAttributes,
  forwardRef, 
  useState 
} from 'react';

// Base Input Props
interface BaseInputProps {
  label?: string;
  error?: string;
  helper?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'ghost';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

// Input Component
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, BaseInputProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
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

  const baseClasses = `
    w-full font-primary text-text placeholder:text-text-weaker rounded-lg
    transition-all duration-200 ease-out focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const hasError = !!error;

  return (
    <div className={className}>
      {label && (
        <motion.label 
          className="block text-sm font-medium text-text-weak mb-1"
          animate={{ 
            color: isFocused ? 'var(--primary)' : hasError ? 'var(--error)' : 'var(--text-weak)' 
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-weaker">
            {icon}
          </div>
        )}
        
        <motion.input
          ref={ref}
          className={`
            ${baseClasses}
            ${variantClasses[variant]}
            ${sizeClasses[size]}
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
          whileFocus={{ scale: 1.005 }}
          transition={{ duration: 0.2 }}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-weaker">
            {icon}
          </div>
        )}
      </div>
      
      {(error || helper) && (
        <motion.p 
          className={`mt-1 text-sm ${error ? 'text-error' : 'text-text-weaker'}`}
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

// Textarea Component
interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>, BaseInputProps {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
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
    sm: 'px-3 py-2 text-sm min-h-[80px]',
    md: 'px-4 py-3 text-base min-h-[120px]',
    lg: 'px-6 py-4 text-lg min-h-[160px]'
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

  const baseClasses = `
    w-full font-primary text-text placeholder:text-text-weaker rounded-lg
    transition-all duration-200 ease-out focus:outline-none resize-vertical
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const hasError = !!error;

  return (
    <div className={className}>
      {label && (
        <motion.label 
          className="block text-sm font-medium text-text-weak mb-1"
          animate={{ 
            color: isFocused ? 'var(--primary)' : hasError ? 'var(--error)' : 'var(--text-weak)' 
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      
      <motion.textarea
        ref={ref}
        className={`
          ${baseClasses}
          ${variantClasses[variant]}
          ${sizeClasses[size]}
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
        whileFocus={{ scale: 1.005 }}
        transition={{ duration: 0.2 }}
        {...props}
      />
      
      {(error || helper) && (
        <motion.p 
          className={`mt-1 text-sm ${error ? 'text-error' : 'text-text-weaker'}`}
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

// Select Component
interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>, BaseInputProps {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  helper,
  size = 'md',
  variant = 'default',
  options,
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

  const baseClasses = `
    w-full font-primary text-text rounded-lg appearance-none
    transition-all duration-200 ease-out focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    bg-[url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")]
    bg-no-repeat bg-right-2 bg-[length:1.5em_1.5em] pr-10
  `;

  const hasError = !!error;

  return (
    <div className={className}>
      {label && (
        <motion.label 
          className="block text-sm font-medium text-text-weak mb-1"
          animate={{ 
            color: isFocused ? 'var(--primary)' : hasError ? 'var(--error)' : 'var(--text-weak)' 
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      
      <motion.select
        ref={ref}
        className={`
          ${baseClasses}
          ${variantClasses[variant]}
          ${sizeClasses[size]}
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
        whileFocus={{ scale: 1.005 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value} 
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </motion.select>
      
      {(error || helper) && (
        <motion.p 
          className={`mt-1 text-sm ${error ? 'text-error' : 'text-text-weaker'}`}
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

// Display names
Input.displayName = 'Input';
Textarea.displayName = 'Textarea';
Select.displayName = 'Select';