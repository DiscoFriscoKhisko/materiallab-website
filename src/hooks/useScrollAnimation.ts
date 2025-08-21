import { useEffect, useState, useRef, useCallback } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isInView, setIsInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        
        if (inView && !hasTriggered) {
          setIsInView(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce) {
          setIsInView(inView);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return { ref: elementRef, isInView };
}

// Hook for staggered animations
export function useStaggeredAnimation(itemCount: number, delay: number = 0.1) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const { ref, isInView } = useScrollAnimation();

  useEffect(() => {
    if (isInView) {
      // Stagger the animations
      Array.from({ length: itemCount }, (_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => new Set([...prev, index]));
        }, index * delay * 1000);
      });
    }
  }, [isInView, itemCount, delay]);

  return { 
    ref, 
    isInView, 
    getItemProps: (index: number) => ({
      animate: visibleItems.has(index) ? 'visible' : 'hidden',
      initial: 'hidden',
    })
  };
}

// Hook for parallax scroll effects
export function useParallaxScroll(intensity: number = 0.5) {
  const [scrollY, setScrollY] = useState(0);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        setScrollY(scrollProgress * intensity * 100);
      }
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [intensity]);

  return { ref: elementRef, scrollY };
}

// Enhanced hook for elegant scroll animations with CSS classes
export function useScrollAnimationClasses(
  animationType: 'fade' | 'scroll' | 'scale' | 'stagger' = 'scroll',
  options: UseScrollAnimationOptions = {}
) {
  const { ref, isInView } = useScrollAnimation(options);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const getAnimationClasses = useCallback(() => {
    const animationMap = {
      fade: 'animate-fade',
      scroll: 'animate-on-scroll', 
      scale: 'animate-scale',
      stagger: 'animate-stagger'
    };
    
    const baseClass = animationMap[animationType];
    const inViewClass = hasAnimated ? 'in-view' : '';
    return `${baseClass} ${inViewClass}`.trim();
  }, [animationType, hasAnimated]);

  return {
    ref,
    isInView,
    hasAnimated,
    animationClasses: getAnimationClasses()
  };
}