import { useEffect, useState, useRef, useCallback } from 'react';
import { usePrefersReducedMotion } from '../utils/hooks';

// Unified animation options interface
interface UseAnimationOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  stagger?: number;
}

// Main animation hook - combines scroll and intersection observer functionality
export function useAnimation(options: UseAnimationOptions = {}) {
  const { 
    threshold = 0.1, 
    rootMargin = '0px', 
    triggerOnce = true,
    delay = 0 
  } = options;
  
  const [isInView, setIsInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    // Skip if already triggered and triggerOnce is true
    if (triggerOnce && hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        
        if (inView && !hasTriggered) {
          if (delay > 0) {
            setTimeout(() => {
              setIsInView(true);
              if (triggerOnce) setHasTriggered(true);
            }, delay);
          } else {
            setIsInView(true);
            if (triggerOnce) setHasTriggered(true);
          }
        } else if (!triggerOnce) {
          setIsInView(inView);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasTriggered, prefersReducedMotion]);

  return { ref: elementRef, isInView, hasTriggered };
}

// Scroll direction hook
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDirection(direction);
      }
      setLastScrollY(scrollY);
    };

    const throttledUpdate = throttle(updateScrollDirection, 100);
    window.addEventListener('scroll', throttledUpdate);

    return () => window.removeEventListener('scroll', throttledUpdate);
  }, [scrollDirection, lastScrollY, prefersReducedMotion]);

  return scrollDirection;
}

// Parallax effect hook
export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrolled = window.scrollY;
      const rate = scrolled * speed;
      
      setOffset(rate);
    };

    const throttledHandler = throttle(handleScroll, 16);
    window.addEventListener('scroll', throttledHandler);

    return () => window.removeEventListener('scroll', throttledHandler);
  }, [speed, prefersReducedMotion]);

  return { ref: elementRef, offset };
}

// Staggered animation hook for lists
export function useStaggeredAnimation(options: UseAnimationOptions = {}) {
  const { stagger = 100, ...animationOptions } = options;
  const [itemsInView, setItemsInView] = useState<boolean[]>([]);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const addItem = useCallback((element: HTMLElement | null) => {
    if (element && !itemRefs.current.includes(element)) {
      itemRefs.current.push(element);
      setItemsInView(prev => [...prev, false]);
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setItemsInView(new Array(itemRefs.current.length).fill(true));
      return;
    }

    const observers = itemRefs.current.map((element, index) => {
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setItemsInView(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * stagger);
          }
        },
        { 
          threshold: animationOptions.threshold || 0.1,
          rootMargin: animationOptions.rootMargin || '0px'
        }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [stagger, animationOptions.threshold, animationOptions.rootMargin, prefersReducedMotion]);

  return { addItem, itemsInView };
}

// Intersection observer hook (simplified)
export function useInView(options: UseAnimationOptions = {}) {
  return useAnimation(options);
}

// Utility function for throttling
function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func(...args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func(...args);
      }, remaining);
    }
  };
}