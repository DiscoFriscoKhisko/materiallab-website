import { motion } from 'framer-motion';

interface LabBlocksProps {
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const LabBlocks = ({ className = '', animated = true, size = 'md' }: LabBlocksProps) => {
  const sizeMap = {
    sm: { width: 120, height: 80 },
    md: { width: 180, height: 120 },
    lg: { width: 240, height: 160 }
  };

  const { width, height } = sizeMap[size];

  return (
    <div className={`inline-block ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 240 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Background blocks (isometric style) */}
        <motion.g
          initial={animated ? { opacity: 0, y: 10 } : {}}
          animate={animated ? { opacity: 1, y: 0 } : {}}
          transition={animated ? { duration: 0.8, delay: 0.2 } : {}}
        >
          {/* Block 1 - Primary */}
          <path
            d="M20 60 L60 40 L100 60 L60 80 Z"
            fill="var(--primary-container)"
            stroke="var(--primary)"
            strokeWidth="2"
            rx="4"
          />
          <path
            d="M60 40 L100 60 L100 100 L60 80 Z"
            fill="var(--primary)"
            opacity="0.8"
          />
          <path
            d="M20 60 L60 80 L60 120 L20 100 Z"
            fill="var(--primary)"
            opacity="0.6"
          />
        </motion.g>

        <motion.g
          initial={animated ? { opacity: 0, y: 15 } : {}}
          animate={animated ? { opacity: 1, y: 0 } : {}}
          transition={animated ? { duration: 0.8, delay: 0.4 } : {}}
        >
          {/* Block 2 - Secondary */}
          <path
            d="M80 40 L120 20 L160 40 L120 60 Z"
            fill="var(--secondary-container)"
            stroke="var(--secondary)"
            strokeWidth="2"
            rx="4"
          />
          <path
            d="M120 20 L160 40 L160 80 L120 60 Z"
            fill="var(--secondary)"
            opacity="0.8"
          />
          <path
            d="M80 40 L120 60 L120 100 L80 80 Z"
            fill="var(--secondary)"
            opacity="0.6"
          />
        </motion.g>

        <motion.g
          initial={animated ? { opacity: 0, y: 20 } : {}}
          animate={animated ? { opacity: 1, y: 0 } : {}}
          transition={animated ? { duration: 0.8, delay: 0.6 } : {}}
        >
          {/* Block 3 - Tertiary */}
          <path
            d="M140 60 L180 40 L220 60 L180 80 Z"
            fill="var(--tertiary-container)"
            stroke="var(--tertiary)"
            strokeWidth="2"
            rx="4"
          />
          <path
            d="M180 40 L220 60 L220 100 L180 80 Z"
            fill="var(--tertiary)"
            opacity="0.8"
          />
          <path
            d="M140 60 L180 80 L180 120 L140 100 Z"
            fill="var(--tertiary)"
            opacity="0.6"
          />
        </motion.g>

        {/* Connection lines - subtle */}
        {animated && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <path
              d="M100 70 Q110 65 120 70"
              stroke="var(--outline)"
              strokeWidth="1"
              strokeDasharray="2,2"
              fill="none"
            />
            <path
              d="M160 70 Q170 65 180 70"
              stroke="var(--outline)"
              strokeWidth="1"
              strokeDasharray="2,2"
              fill="none"
            />
          </motion.g>
        )}

        {/* Subtle glow effect */}
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feMorphology operator="dilate" radius="2"/>
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

// Animated assembly version for hero sections
export const LabBlocksAssembly = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`inline-block ${className}`}>
      <svg
        width="320"
        height="200"
        viewBox="0 0 320 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Block 1 - Slides in from left */}
        <motion.g
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          <path
            d="M20 80 L80 50 L140 80 L80 110 Z"
            fill="var(--primary-container)"
            stroke="var(--primary)"
            strokeWidth="3"
            rx="6"
          />
          <path
            d="M80 50 L140 80 L140 140 L80 110 Z"
            fill="var(--primary)"
            opacity="0.8"
          />
          <path
            d="M20 80 L80 110 L80 170 L20 140 Z"
            fill="var(--primary)"
            opacity="0.6"
          />
        </motion.g>

        {/* Block 2 - Slides in from top */}
        <motion.g
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
        >
          <path
            d="M120 60 L180 30 L240 60 L180 90 Z"
            fill="var(--secondary-container)"
            stroke="var(--secondary)"
            strokeWidth="3"
            rx="6"
          />
          <path
            d="M180 30 L240 60 L240 120 L180 90 Z"
            fill="var(--secondary)"
            opacity="0.8"
          />
          <path
            d="M120 60 L180 90 L180 150 L120 120 Z"
            fill="var(--secondary)"
            opacity="0.6"
          />
        </motion.g>

        {/* Block 3 - Slides in from right */}
        <motion.g
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.1, ease: 'easeOut' }}
        >
          <path
            d="M180 100 L240 70 L300 100 L240 130 Z"
            fill="var(--tertiary-container)"
            stroke="var(--tertiary)"
            strokeWidth="3"
            rx="6"
          />
          <path
            d="M240 70 L300 100 L300 160 L240 130 Z"
            fill="var(--tertiary)"
            opacity="0.8"
          />
          <path
            d="M180 100 L240 130 L240 190 L180 160 Z"
            fill="var(--tertiary)"
            opacity="0.6"
          />
        </motion.g>

        {/* Connecting signals - animate in after blocks */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.path
            d="M140 90 Q160 85 180 90"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeDasharray="4,3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          />
          <motion.path
            d="M240 90 Q260 85 280 100"
            stroke="var(--secondary)"
            strokeWidth="2"
            strokeDasharray="4,3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          />
        </motion.g>

        {/* Final glow effect */}
        <motion.circle
          cx="160"
          cy="100"
          r="80"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1"
          opacity="0.1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, delay: 2 }}
        />
      </svg>
    </div>
  );
};