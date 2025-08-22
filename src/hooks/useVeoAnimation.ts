import { useEffect, useRef, useState } from 'react';

// Advanced scroll animation hook with Veo-like behavior
interface UseVeoScrollOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  stagger?: number;
}

export const useVeoScroll = (options: UseVeoScrollOptions = {}) => {
  const {
    threshold = 0.2,
    rootMargin = '0px 0px -10% 0px',
    triggerOnce = true,
    delay = 0,
    stagger = 100
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (triggerOnce && hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            if (triggerOnce) {
              setHasTriggered(true);
            }
          }, delay);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasTriggered]);

  return { elementRef, isVisible };
};

// Staggered animations for multiple elements
export const useVeoStaggered = (count: number, options: UseVeoScrollOptions = {}) => {
  const { stagger = 100, ...scrollOptions } = options;
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(count).fill(false));
  const elementsRef = useRef<(HTMLElement | null)[]>(new Array(count).fill(null));

  useEffect(() => {
    const elements = elementsRef.current.filter(Boolean);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const index = elements.indexOf(element);
            
            if (index !== -1) {
              setTimeout(() => {
                setVisibleItems(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * stagger);

              if (scrollOptions.triggerOnce !== false) {
                observer.unobserve(element);
              }
            }
          }
        });
      },
      {
        threshold: scrollOptions.threshold || 0.2,
        rootMargin: scrollOptions.rootMargin || '0px 0px -10% 0px'
      }
    );

    elements.forEach(element => {
      if (element) observer.observe(element);
    });

    return () => {
      elements.forEach(element => {
        if (element) observer.unobserve(element);
      });
    };
  }, [stagger, scrollOptions.threshold, scrollOptions.rootMargin, scrollOptions.triggerOnce]);

  const setElementRef = (index: number) => (el: HTMLElement | null) => {
    elementsRef.current[index] = el;
  };

  return { setElementRef, visibleItems };
};

// Parallax scroll effect
export const useVeoParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const parallax = scrolled * speed;

      setOffset(parallax);
    };

    const throttledScroll = throttle(handleScroll, 16); // ~60fps
    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [speed]);

  return { elementRef, offset };
};

// Smooth scroll with easing
export const useVeoSmoothScroll = () => {
  const scrollTo = (targetId: string, options: ScrollIntoViewOptions = {}) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
      ...options
    });
  };

  return { scrollTo };
};

// Advanced scroll progress tracking
export const useVeoScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const calculateProgress = () => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.pageYOffset;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;

      // Calculate when element starts entering viewport
      const start = elementTop - windowHeight;
      const end = elementTop + elementHeight;
      const distance = end - start;
      const current = scrollTop - start;

      // Progress from 0 to 1
      const progress = Math.max(0, Math.min(1, current / distance));
      setProgress(progress);
    };

    const throttledScroll = throttle(calculateProgress, 16);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    calculateProgress();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  return { elementRef, progress };
};

// Scroll direction detection
export const useVeoScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      if (Math.abs(scrollY - lastScrollY) > 5) { // Minimum threshold
        setScrollDirection(direction);
        setLastScrollY(scrollY);
      }
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [lastScrollY]);

  return scrollDirection;
};

// Throttle utility function
function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

// Animation orchestrator for complex sequences
export const useVeoSequence = (steps: Array<{ delay: number; duration: number }>) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    setIsPlaying(true);
    setCurrentStep(0);

    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        
        // Mark as complete after duration
        setTimeout(() => {
          if (index === steps.length - 1) {
            setIsPlaying(false);
          }
        }, step.duration);
      }, step.delay);
    });
  };

  const reset = () => {
    setCurrentStep(-1);
    setIsPlaying(false);
  };

  return {
    currentStep,
    isPlaying,
    play,
    reset,
    isStepActive: (index: number) => currentStep >= index,
    isStepComplete: (index: number) => currentStep > index
  };
};