import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

export const FloatingElements = ({ count = 6, className = '' }: FloatingElementsProps) => {
  const elements = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)],
      color: ['primary', 'purple', 'blue', 'green'][Math.floor(Math.random() * 4)]
    }));
  }, [count]);

  const getShapeStyles = (shape: string, size: number) => {
    const base = {
      width: size,
      height: size,
    };

    switch (shape) {
      case 'circle':
        return { ...base, borderRadius: '50%' };
      case 'square':
        return { ...base, borderRadius: '20%' };
      case 'triangle':
        return {
          width: 0,
          height: 0,
          borderLeft: `${size/2}px solid transparent`,
          borderRight: `${size/2}px solid transparent`,
          borderBottom: `${size}px solid currentColor`,
        };
      default:
        return base;
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'primary': return 'text-primary-200/30';
      case 'purple': return 'text-purple-200/30';
      case 'blue': return 'text-blue-200/30';
      case 'green': return 'text-green-200/30';
      default: return 'text-gray-200/30';
    }
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${getColorClass(element.color)}`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            ...getShapeStyles(element.shape, element.size)
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            rotate: element.shape === 'triangle' ? [0, 360] : [0, 180, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {element.shape !== 'triangle' && (
            <div className="w-full h-full bg-current" />
          )}
        </motion.div>
      ))}
    </div>
  );
};