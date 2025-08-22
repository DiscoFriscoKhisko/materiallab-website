import { motion, type PanInfo } from 'framer-motion';
import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { VeoCarouselCard } from './VeoCarouselCard';
import { VeoCarouselDots } from './VeoCarouselDots';

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
  media?: {
    type: 'image' | 'video';
    src: string;
    poster?: string;
  };
  metric?: {
    value: string;
    label: string;
  };
  gradient?: 'coral' | 'ion' | 'primary' | 'secondary';
  cta?: {
    label: string;
    onClick: () => void;
  };
}

interface VeoCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  cardsPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  className?: string;
}

export const VeoCarousel = ({
  items,
  autoPlay = false,
  interval = 5000,
  showDots = true,
  cardsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  className = '',
}: VeoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(cardsPerView.desktop);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  // Responsive cards per view
  useEffect(() => {
    const updateCardsVisible = () => {
      if (window.innerWidth < 768) {
        setCardsVisible(cardsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setCardsVisible(cardsPerView.tablet);
      } else {
        setCardsVisible(cardsPerView.desktop);
      }
    };

    updateCardsVisible();
    window.addEventListener('resize', updateCardsVisible);
    return () => window.removeEventListener('resize', updateCardsVisible);
  }, [cardsPerView]);

  // Calculate drag constraints
  useEffect(() => {
    const maxIndex = Math.max(0, items.length - cardsVisible);
    const cardWidth = 350; // Card width + gap
    const totalWidth = cardWidth * maxIndex;
    
    setDragConstraints({
      left: -totalWidth,
      right: 0,
    });
  }, [items.length, cardsVisible]);

  // Auto-play logic
  useEffect(() => {
    if (!autoPlay || isPaused || items.length <= cardsVisible) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = items.length - cardsVisible;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, items.length, cardsVisible]);

  const handleDotClick = useCallback((index: number) => {
    const maxIndex = Math.max(0, items.length - cardsVisible);
    setCurrentIndex(Math.min(index, maxIndex));
  }, [items.length, cardsVisible]);

  const handleDragEnd = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    const maxIndex = Math.max(0, items.length - cardsVisible);

    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (info.offset.x < -threshold && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, items.length, cardsVisible]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const maxIndex = Math.max(0, items.length - cardsVisible);
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        setCurrentIndex((prev) => Math.max(0, prev - 1));
        break;
      case 'ArrowRight':
        event.preventDefault();
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
        break;
      case 'Home':
        event.preventDefault();
        setCurrentIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setCurrentIndex(maxIndex);
        break;
    }
  }, [items.length, cardsVisible]);

  // Keyboard navigation
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown as any);
    return () => window.removeEventListener('keydown', handleKeyDown as any);
  }, [handleKeyDown]);

  if (items.length === 0) return null;

  return (
    <div 
      className={`veo-carousel relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Carousel Container */}
      <div className="carousel-viewport overflow-hidden">
        <motion.div
          className="carousel-track flex gap-6"
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          animate={{
            x: -currentIndex * 350, // Card width + gap
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          style={{
            width: items.length * 350,
          }}
        >
          {items.map((item, index) => (
            <VeoCarouselCard
              key={item.id}
              item={item}
              isActive={index >= currentIndex && index < currentIndex + cardsVisible}
              index={index}
            />
          ))}
        </motion.div>
      </div>

      {/* Navigation Dots */}
      {showDots && items.length > cardsVisible && (
        <div className="flex justify-center mt-8">
          <VeoCarouselDots
            total={Math.max(1, items.length - cardsVisible + 1)}
            current={currentIndex}
            onChange={handleDotClick}
          />
        </div>
      )}

      {/* Progress Indicator for Auto-play */}
      {autoPlay && !isPaused && items.length > cardsVisible && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-1 bg-on-surface/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: interval / 1000,
                ease: "linear",
                repeat: Infinity,
              }}
              key={currentIndex} // Reset animation on slide change
            />
          </div>
        </div>
      )}

      {/* Screen Reader Navigation */}
      <div className="sr-only">
        <p>Carousel with {items.length} items. Use arrow keys to navigate.</p>
        <p>Currently showing items {currentIndex + 1} to {Math.min(currentIndex + cardsVisible, items.length)} of {items.length}</p>
      </div>
    </div>
  );
};