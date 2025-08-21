import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'dark' | 'gradient';
  blur?: 'sm' | 'md' | 'lg';
  border?: boolean;
  hover?: boolean;
}

export const GlassmorphismCard = ({
  children,
  className = '',
  variant = 'light',
  blur = 'md',
  border = true,
  hover = true
}: GlassmorphismCardProps) => {
  const variantClasses = {
    light: 'bg-white/20 text-slate-800',
    dark: 'bg-slate-900/20 text-white',
    gradient: 'bg-gradient-to-br from-white/30 via-white/20 to-transparent text-slate-800'
  };

  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg'
  };

  const borderClass = border ? 'border border-white/20' : '';

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl
        ${variantClasses[variant]}
        ${blurClasses[blur]}
        ${borderClass}
        ${className}
      `}
      {...(hover && {
        whileHover: { scale: 1.02, y: -5 },
        transition: { type: 'spring', stiffness: 300, damping: 30 }
      })}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full opacity-0 hover:opacity-100 hover:translate-x-full transition-all duration-1000 ease-out" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </motion.div>
  );
};