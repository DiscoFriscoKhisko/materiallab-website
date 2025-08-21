import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Hero3DProps {
  className?: string;
  variant?: 'lab' | 'process' | 'innovation';
}

export const Hero3D = ({ className = '', variant = 'lab' }: Hero3DProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Simulate video-like frame progression
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % 60); // 60 frame loop
    }, 100); // ~10fps for smooth animation

    return () => clearInterval(interval);
  }, [isPlaying]);

  const labScenes = {
    lab: {
      title: 'AI Product Lab',
      description: 'Where ideas become intelligent solutions',
      elements: [
        { type: 'cube', position: [0, 0, 0], color: 'var(--primary)' },
        { type: 'sphere', position: [2, 1, -1], color: 'var(--secondary)' },
        { type: 'cylinder', position: [-2, 0.5, 1], color: 'var(--tertiary)' },
      ]
    },
    process: {
      title: 'Systematic Innovation',
      description: 'Methodical approach to better solutions',
      elements: [
        { type: 'flow', position: [0, 0, 0], color: 'var(--primary)' },
        { type: 'nodes', position: [1, 0, -0.5], color: 'var(--secondary)' },
        { type: 'connections', position: [-1, 0, 0.5], color: 'var(--tertiary)' },
      ]
    },
    innovation: {
      title: 'Future-Ready Products',
      description: 'Building next generation products',
      elements: [
        { type: 'helix', position: [0, 0, 0], color: 'var(--primary)' },
        { type: 'particles', position: [0, 0, 0], color: 'var(--secondary)' },
        { type: 'energy', position: [0, 0, 0], color: 'var(--tertiary)' },
      ]
    }
  };

  const scene = labScenes[variant];

  return (
    <div className={`relative ${className}`}>
      {/* Hero Video Placeholder with 3D-like Effects */}
      <motion.div
        className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-surface to-surface-3 shadow-elevation-3"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, var(--primary) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, var(--secondary) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, var(--tertiary) 0%, transparent 50%)
            `
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* 3D Elements Simulation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-96 h-96">
            {scene.elements.map((element, index) => (
              <motion.div
                key={index}
                className="absolute w-16 h-16 rounded-lg shadow-elevation-2"
                style={{
                  backgroundColor: element.color,
                  left: `${50 + element.position[0] * 10}%`,
                  top: `${50 + element.position[1] * 10}%`,
                  zIndex: 10 + element.position[2]
                }}
                animate={{
                  rotateX: [0, 360],
                  rotateY: [0, 180, 360],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 8 + index * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.5
                }}
              />
            ))}
          </div>
        </div>

        {/* Play/Pause Overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={() => setIsPlaying(!isPlaying)}
          whileHover={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-surface/80 backdrop-blur-md border border-outline-variant flex items-center justify-center text-on-surface shadow-elevation-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </motion.div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 h-1 bg-outline-variant rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isPlaying ? 1 : 0 }}
        >
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${(currentFrame / 60) * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        {/* Video Quality Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-surface/80 backdrop-blur-md rounded-full border border-outline-variant text-xs font-mono text-on-surface">
          {isPlaying ? 'LIVE' : '4K'}
        </div>
      </motion.div>

      {/* Content Below Video */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h3 className="text-title font-headline font-semibold mb-2 text-on-surface">
          {scene.title}
        </h3>
        <p className="text-body text-on-surface-variant">
          {scene.description}
        </p>
      </motion.div>
    </div>
  );
};

// Enhanced Hero Video with Multiple Variants
export const HeroVideoSystem = ({ className = '' }: { className?: string }) => {
  const [activeVariant, setActiveVariant] = useState<'lab' | 'process' | 'innovation'>('lab');
  
  const variants = [
    { key: 'lab', label: 'Lab Environment' },
    { key: 'process', label: 'Our Process' },
    { key: 'innovation', label: 'Innovation' }
  ] as const;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Video Selector */}
      <div className="flex justify-center gap-2">
        {variants.map((variant) => (
          <motion.button
            key={variant.key}
            className={`px-4 py-2 rounded-lg text-label font-medium transition-all duration-base ${
              activeVariant === variant.key 
                ? 'bg-primary text-on-primary shadow-elevation-1' 
                : 'bg-surface-1 text-on-surface-variant hover:bg-surface-2'
            }`}
            onClick={() => setActiveVariant(variant.key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {variant.label}
          </motion.button>
        ))}
      </div>

      {/* Active Video */}
      <Hero3D variant={activeVariant} />
    </div>
  );
};