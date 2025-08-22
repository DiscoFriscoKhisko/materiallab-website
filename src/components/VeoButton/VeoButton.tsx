import { motion } from 'framer-motion';
import { type ReactNode, type ButtonHTMLAttributes, forwardRef } from 'react';

interface VeoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  href?: string;
}

export const VeoButton = forwardRef<HTMLButtonElement, VeoButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  href,
  ...props
}, ref) => {
  // Base button styles matching Veo exactly
  const baseClasses = `
    relative inline-flex items-center justify-center gap-2
    font-medium font-primary rounded-full
    transition-all duration-200 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    veo-focus-ring
  `;

  // Variant styles - exact Veo matching
  const variantClasses = {
    primary: `
      bg-primary text-on-primary
      shadow-sm hover:shadow-md
      hover:-translate-y-0.5 hover:shadow-lg
      active:translate-y-0 active:shadow-sm
      transition-all duration-200 ease-out
    `,
    secondary: `
      bg-surface text-on-surface
      border border-outline
      shadow-sm hover:shadow-md
      hover:-translate-y-0.5 hover:bg-surface-1
      active:translate-y-0 active:shadow-sm
      transition-all duration-200 ease-out
    `,
    ghost: `
      bg-transparent text-on-surface
      hover:bg-surface-1 hover:-translate-y-0.5
      active:bg-surface-2 active:translate-y-0
      transition-all duration-200 ease-out
    `,
    outline: `
      bg-transparent text-on-surface
      border border-outline
      hover:bg-surface-1 hover:-translate-y-0.5 hover:border-outline-variant
      active:translate-y-0 active:bg-surface-2
      transition-all duration-200 ease-out
    `
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',     // 36px height
    md: 'px-6 py-3 text-base min-h-[48px]',   // 48px height - Veo standard
    lg: 'px-8 py-4 text-lg min-h-[56px]'      // 56px height
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const isDisabled = disabled || loading;

  const buttonContent = (
    <>
      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}

      {/* Content */}
      <div className={`flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {icon && iconPosition === 'left' && (
          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && (
          <motion.span 
            className="flex-shrink-0 w-5 h-5 flex items-center justify-center"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.span>
        )}
      </div>

      {/* Hover glow effect */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary opacity-0 -z-10"
          whileHover={{
            opacity: 0.2,
            scale: 1.05,
            boxShadow: '0 8px 32px rgba(138, 99, 210, 0.3)'
          }}
          transition={{ duration: 0.2 }}
        />
      )}
    </>
  );

  // If href is provided, render as link styled as button
  if (href && !isDisabled) {
    return (
      <motion.a
        href={href}
        className={`
          ${baseClasses}
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${widthClass}
          ${className}
        `}
        whileHover={!isDisabled ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {buttonContent}
      </motion.a>
    );
  }

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
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={isDisabled}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
});

VeoButton.displayName = 'VeoButton';

// Arrow icon component for consistent usage
export const VeoArrowIcon = ({ direction = 'right' }: { direction?: 'right' | 'left' | 'up' | 'down' }) => {
  const rotations = {
    right: 0,
    left: 180,
    up: -90,
    down: 90
  };

  return (
    <svg 
      className="w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
      style={{ transform: `rotate(${rotations[direction]}deg)` }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
};

// Link component with consistent styling
interface VeoLinkProps {
  children: ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  showArrow?: boolean;
  external?: boolean;
  className?: string;
}

export const VeoLink = ({ 
  children, 
  href, 
  variant = 'primary',
  showArrow = false,
  external = false,
  className = '' 
}: VeoLinkProps) => {
  const variantClasses = {
    primary: 'text-primary hover:text-primary-hover',
    secondary: 'text-on-surface hover:text-primary',
    ghost: 'text-on-surface-variant hover:text-on-surface'
  };

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`
        inline-flex items-center gap-1 
        font-medium transition-all duration-200 
        hover:underline underline-offset-4
        veo-focus-ring
        ${variantClasses[variant]}
        ${className}
      `}
      whileHover={{ x: showArrow ? 2 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <span>{children}</span>
      {showArrow && (
        <motion.span
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <VeoArrowIcon />
        </motion.span>
      )}
      {external && (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </motion.a>
  );
};