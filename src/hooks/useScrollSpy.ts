import { useEffect, useState, useRef, useCallback } from 'react';

interface ScrollSpyItem {
  id: string;
  href: string;
  label: string;
}

interface UseScrollSpyOptions {
  rootMargin?: string;
  threshold?: number;
  offset?: number; // Offset from top when determining active section
}

export function useScrollSpy(
  items: ScrollSpyItem[], 
  options: UseScrollSpyOptions = {}
) {
  const { rootMargin = '-20% 0px -60% 0px', threshold = 0.1, offset = 100 } = options;
  const [activeId, setActiveId] = useState<string>('');
  const observersRef = useRef<Map<string, IntersectionObserver>>(new Map());

  useEffect(() => {
    const observers = observersRef.current;
    
    // Clear existing observers
    observers.forEach(observer => observer.disconnect());
    observers.clear();

    items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        {
          rootMargin,
          threshold,
        }
      );

      observer.observe(element);
      observers.set(id, observer);
    });

    // Fallback: use scroll position to determine active section
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      
      let currentActiveId = '';
      let minDistance = Infinity;

      items.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (!element) return;

        const elementTop = element.offsetTop;
        const distance = Math.abs(scrollPosition - elementTop);

        if (scrollPosition >= elementTop && distance < minDistance) {
          currentActiveId = id;
          minDistance = distance;
        }
      });

      if (currentActiveId && currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      observers.forEach(observer => observer.disconnect());
      observers.clear();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items, rootMargin, threshold, offset, activeId]);

  const scrollToSection = useCallback((id: string, behavior: ScrollBehavior = 'smooth') => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerHeight = 80; // Account for sticky header
    const elementTop = element.offsetTop - headerHeight;

    window.scrollTo({
      top: elementTop,
      behavior,
    });

    // Update active state immediately for better UX
    setActiveId(id);
  }, []);

  const isActive = useCallback((id: string) => activeId === id, [activeId]);

  return {
    activeId,
    scrollToSection,
    isActive,
  };
}

// Hook specifically for jump links navigation
export function useJumpLinks(sections: { id: string; label: string }[]) {
  const items = sections.map(section => ({
    ...section,
    href: `#${section.id}`,
  }));

  const scrollSpy = useScrollSpy(items, {
    rootMargin: '-10% 0px -70% 0px', // More aggressive for jump links
    threshold: 0.1,
    offset: 120,
  });

  const handleLinkClick = useCallback((
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    scrollSpy.scrollToSection(id);
    
    // Update URL hash without triggering scroll
    const url = new URL(window.location.href);
    url.hash = id;
    window.history.pushState({}, '', url.toString());
  }, [scrollSpy]);

  return {
    ...scrollSpy,
    items,
    handleLinkClick,
  };
}