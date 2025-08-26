import { useEffect, useState, useRef, useCallback } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -10% 0px', triggerOnce = false } = options;
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

// Enhanced hook that provides more detailed states like Google DeepMind
export function useInViewStates(options: UseInViewOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -10% 0px' } = options;
  const [viewState, setViewState] = useState<'out-view-top' | 'in-view' | 'out-view-bottom'>('out-view-top');
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setViewState('in-view');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const { isIntersecting, boundingClientRect } = entry;
        
        if (isIntersecting) {
          setViewState('in-view');
        } else {
          // Determine if element is above or below viewport
          const isAboveViewport = boundingClientRect.bottom < window.innerHeight && boundingClientRect.top < 0;
          setViewState(isAboveViewport ? 'out-view-bottom' : 'out-view-top');
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
  }, [threshold, rootMargin]);

  const getClasses = useCallback(() => {
    return `gemini-in-view-element gemini-in-view-element--${viewState}`;
  }, [viewState]);

  return { 
    ref: elementRef, 
    viewState, 
    isInView: viewState === 'in-view',
    classes: getClasses()
  };
}