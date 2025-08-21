import { motion } from 'framer-motion';
import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { useMagneticEffect } from '../../utils/hooks';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  magneticStrength?: number;
  rippleColor?: string;
  showArrow?: boolean;
}

export const MagneticButton = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  magneticStrength = 0.3,
  rippleColor = 'rgba(85, 194, 255, 0.3)',
  showArrow = false,
  onClick,
  ...props
}: MagneticButtonProps) => {
  const magneticRef = useMagneticEffect(magneticStrength);

  const baseClasses = 'relative overflow-hidden font-medium font-body rounded-lg transition-all duration-base focus:outline-none focus:ring-2 focus:ring-offset-2 transform-gpu';

  const variantClasses = {
    primary: 'bg-coral text-text-inverse hover:bg-coral-strong focus:ring-ion btn-magnetic shadow-elevation-1 hover:shadow-elevation-2',
    secondary: 'bg-surface text-text border border-glass-light hover:bg-surface-2 focus:ring-ion btn-magnetic shadow-elevation-1 hover:shadow-elevation-2',
    ghost: 'text-ion hover:bg-ion-subtle focus:ring-ion',
    gradient: 'bg-gradient-to-r from-coral to-ion text-text-inverse hover:from-coral-strong hover:to-ion-strong focus:ring-ion animate-gradient btn-magnetic shadow-elevation-1 hover:shadow-elevation-2'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Create ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, ${rippleColor} 0%, transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
      z-index: 10;
    `;
    
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);

    onClick?.(e);
  };

  return (
    <>
      <style>{`
        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
      <motion.button
        ref={magneticRef as any}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        {...(props as any)}
      >
        <span className="relative z-20 flex items-center justify-center gap-2">
          {children}
          {showArrow && (
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          )}
        </span>
      </motion.button>
    </>
  );
};