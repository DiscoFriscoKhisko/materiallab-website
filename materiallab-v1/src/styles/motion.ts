import type { Variants, Transition } from 'framer-motion';

// Type definitions for motion presets
export type MotionPreset = Variants;
export type TransitionPreset = Transition;

// Motion duration tokens
export const durations = {
  fast: 0.16,
  base: 0.24,
  slow: 0.36,
  xslow: 0.6,
  xxslow: 0.8,
} as const;

// Easing presets
export const easings = {
  standard: [0.2, 0, 0, 1] as const,
  enter: [0, 0, 0.2, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
} as const;

// Spring presets
export const springs = {
  default: { type: 'spring' as const, stiffness: 280, damping: 26, mass: 1 },
  gentle: { type: 'spring' as const, stiffness: 120, damping: 14, mass: 1 },
  bouncy: { type: 'spring' as const, stiffness: 400, damping: 20, mass: 0.8 },
} as const;

// === CARD ANIMATIONS ===

export const elevateCard: MotionPreset = {
  initial: {
    scale: 1,
    y: 0,
    boxShadow: '0 0.25rem 0.75rem rgba(0, 0, 0, 0.45), 0 0 1rem rgba(255, 111, 97, 0.12)',
  },
  hover: {
    scale: 1.01,
    y: -8,
    boxShadow: '0 0.375rem 1.125rem rgba(0, 0, 0, 0.5), 0 0 1.25rem rgba(85, 194, 255, 0.14)',
    transition: {
      duration: durations.base,
      ease: easings.standard,
    },
  },
  tap: {
    scale: 0.99,
    y: -2,
    transition: {
      duration: durations.fast,
      ease: easings.standard,
    },
  },
};

// === BUTTON ANIMATIONS ===

export const magneticButton: MotionPreset = {
  initial: {
    scale: 1,
    boxShadow: '0 0 0 rgba(85, 194, 255, 0)',
  },
  hover: {
    scale: 1.02,
    y: -2,
    boxShadow: '0 0 0.5rem rgba(85, 194, 255, 0.3)',
    transition: {
      duration: durations.fast,
      ease: easings.enter,
    },
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: {
      duration: durations.fast,
      ease: easings.exit,
    },
  },
};

export const rimGlow: MotionPreset = {
  initial: {
    boxShadow: '0 0 0 rgba(85, 194, 255, 0)',
  },
  hover: {
    boxShadow: '0 0 0.5rem rgba(85, 194, 255, 0.4)',
    transition: {
      duration: 0.12, // 120ms as specified
      ease: easings.enter,
    },
  },
};

// === NAVIGATION ANIMATIONS ===

export const navUnderline: MotionPreset = {
  initial: {
    scaleX: 0,
    originX: 0,
  },
  animate: {
    scaleX: 1,
    transition: {
      duration: durations.base,
      ease: easings.standard,
    },
  },
  exit: {
    scaleX: 0,
    transition: {
      duration: durations.base,
      ease: easings.standard,
    },
  },
};

// === TYPOGRAPHY ANIMATIONS ===

export const kineticWord: MotionPreset = {
  initial: {
    opacity: 0,
    y: 20,
    fontWeight: 500,
    letterSpacing: '0em',
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.slow,
      ease: easings.enter,
    },
  },
  hover: {
    fontWeight: 700,
    letterSpacing: '-0.02em',
    transition: {
      duration: durations.fast,
      ease: easings.standard,
    },
  },
};

export const wordReveal: MotionPreset = {
  initial: {
    opacity: 0,
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
  },
  animate: {
    opacity: 1,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: {
      duration: durations.slow,
      ease: easings.enter,
    },
  },
};

// === 3D & TRANSFORM ANIMATIONS ===

export const tileOrbit: MotionPreset = {
  initial: {
    rotateX: 0,
    rotateY: 0,
  },
  hover: {
    rotateX: -6,
    rotateY: 6,
    transition: springs.gentle,
  },
};

export const parallaxFloat: MotionPreset = {
  animate: {
    y: [0, -10, 0],
    rotateZ: [0, 1, 0],
    transition: {
      duration: durations.xxslow,
      repeat: Infinity,
      ease: easings.standard,
    },
  },
};

// === PAGE TRANSITIONS ===

export const pageTransition: MotionPreset = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.base,
      ease: easings.enter,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: durations.base,
      ease: easings.exit,
    },
  },
};

export const staggerContainer: MotionPreset = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// === MODAL & OVERLAY ANIMATIONS ===

export const modalBackdrop: MotionPreset = {
  initial: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
  },
  animate: {
    opacity: 1,
    backdropFilter: 'blur(16px)',
    transition: {
      duration: durations.base,
      ease: easings.enter,
    },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: durations.base,
      ease: easings.exit,
    },
  },
};

export const modalPanel: MotionPreset = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 50,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springs.default,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 50,
    transition: {
      duration: durations.base,
      ease: easings.exit,
    },
  },
};

// === SCROLL-TRIGGERED ANIMATIONS ===

export const scrollReveal: MotionPreset = {
  initial: {
    opacity: 0,
    y: 40,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.slow,
      ease: easings.enter,
    },
  },
};

export const scrollRevealStagger: MotionPreset = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// === LOADING & PROGRESS ANIMATIONS ===

export const loadingDots: MotionPreset = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: durations.slow,
      repeat: Infinity,
      ease: easings.standard,
    },
  },
};

export const shimmer: MotionPreset = {
  animate: {
    x: ['-100%', '100%'],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// === UTILITY FUNCTIONS ===

/**
 * Create a staggered animation with custom delay
 */
export const createStagger = (delay: number = 0.1) => ({
  animate: {
    transition: {
      staggerChildren: delay,
      delayChildren: delay * 2,
    },
  },
});

/**
 * Create a custom spring with specific parameters
 */
export const createSpring = (stiffness: number, damping: number, mass: number = 1): Transition => ({
  type: 'spring',
  stiffness,
  damping,
  mass,
});

/**
 * Reduced motion variants - replaces complex animations with simple fades
 */
export const reducedMotion = {
  elevateCard: {
    hover: {
      opacity: 0.9,
      transition: { duration: 0.01 },
    },
  },
  kineticWord: {
    animate: {
      opacity: 1,
      transition: { duration: 0.01 },
    },
    hover: {
      opacity: 0.8,
      transition: { duration: 0.01 },
    },
  },
  scrollReveal: {
    animate: {
      opacity: 1,
      transition: { duration: 0.01 },
    },
  },
};

// === PREFERS REDUCED MOTION HOOK ===

export const useReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};