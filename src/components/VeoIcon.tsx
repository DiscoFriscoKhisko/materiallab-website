import { motion } from 'framer-motion';
import { type SVGAttributes, forwardRef } from 'react';

interface VeoIconProps extends SVGAttributes<SVGElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'current';
  animation?: 'none' | 'spin' | 'pulse' | 'bounce' | 'rotate';
}

export const VeoIcon = forwardRef<SVGSVGElement, VeoIconProps>(({
  size = 'md',
  color = 'current',
  animation = 'none',
  className = '',
  children,
  ...props
}, ref) => {
  const sizeClasses = {
    xs: 'w-3 h-3',     // 12px
    sm: 'w-4 h-4',     // 16px
    md: 'w-5 h-5',     // 20px
    lg: 'w-6 h-6',     // 24px - Veo standard
    xl: 'w-8 h-8'      // 32px
  };

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    error: 'text-error',
    warning: 'text-warning',
    current: 'text-current'
  };

  const animationVariants = {
    none: {},
    spin: {
      animate: { rotate: 360 },
      transition: { duration: 1, repeat: Infinity, ease: 'linear' }
    },
    pulse: {
      animate: { scale: [1, 1.1, 1] },
      transition: { duration: 1, repeat: Infinity }
    },
    bounce: {
      animate: { y: [0, -4, 0] },
      transition: { duration: 0.6, repeat: Infinity }
    },
    rotate: {
      whileHover: { rotate: 180 },
      transition: { duration: 0.3 }
    }
  };

  const MotionIcon = animation === 'none' ? 'svg' : motion.svg;

  return (
    <MotionIcon
      ref={ref}
      className={`inline-block ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      {...(animation !== 'none' ? animationVariants[animation] : {})}
      {...props}
    >
      {children}
    </MotionIcon>
  );
});

VeoIcon.displayName = 'VeoIcon';

// Common Veo icons as components
export const VeoArrowRightIcon = (props: Omit<VeoIconProps, 'children'>) => (
  <VeoIcon {...props}>
    <path d="M9 5l7 7-7 7" />
  </VeoIcon>
);

export const VeoArrowLeftIcon = (props: Omit<VeoIconProps, 'children'>) => (
  <VeoIcon {...props}>
    <path d="M15 19l-7-7 7-7" />
  </VeoIcon>
);

export const VeoCheckIcon = (props: Omit<VeoIconProps, 'children'>) => (
  <VeoIcon {...props}>
    <path d="M20 6L9 17l-5-5" />
  </VeoIcon>
);

export const VeoXIcon = (props: Omit<VeoIconProps, 'children'>) => (
  <VeoIcon {...props}>
    <path d="M18 6L6 18M6 6l12 12" />
  </VeoIcon>
);

export const VeoMailIcon = (props: Omit<VeoIconProps, 'children'>) => (
  <VeoIcon {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </VeoIcon>
);

export const VeoPhoneIcon = (props: Omit<VeoIconProps, 'children'>) => (
  <VeoIcon {...props}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </VeoIcon>
);

export const VeoStarIcon = (props: Omit<VeoIconProps, 'children'>) => (
  <VeoIcon {...props}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </VeoIcon>
);

export const VeoMenuIcon = (props: Omit<VeoIconProps, 'children'>) => (
  <VeoIcon {...props}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </VeoIcon>
);

export const VeoSearchIcon = (props: Omit<VeoIconProps, 'children'>) => (
  <VeoIcon {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </VeoIcon>
);

export const VeoExternalLinkIcon = (props: Omit<VeoIconProps, 'children'>) => (
  <VeoIcon {...props}>
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </VeoIcon>
);

export const VeoLoadingIcon = (props: Omit<VeoIconProps, 'children'>) => (
  <VeoIcon animation="spin" {...props}>
    <path d="M21 12a9 9 0 11-6.219-8.56" />
  </VeoIcon>
);