import { motion } from 'framer-motion';

interface SignalLinesProps {
  className?: string;
  animated?: boolean;
  direction?: 'horizontal' | 'vertical';
  variant?: 'flow' | 'process' | 'connection';
}

export const SignalLines = ({ 
  className = '', 
  animated = true, 
  direction = 'horizontal',
  variant = 'flow'
}: SignalLinesProps) => {
  
  if (variant === 'process') {
    return (
      <div className={`inline-block ${className}`}>
        <svg
          width="400"
          height="120"
          viewBox="0 0 400 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-60"
        >
          {/* Process flow: Discover → Design → Build → Automate */}
          <motion.g
            initial={animated ? { opacity: 0 } : {}}
            animate={animated ? { opacity: 1 } : {}}
            transition={animated ? { duration: 1, delay: 0.3 } : {}}
          >
            {/* Main flow line */}
            <motion.path
              d="M20 60 Q120 40, 180 60 T340 60"
              stroke="var(--primary)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6,4"
              initial={animated ? { pathLength: 0 } : {}}
              animate={animated ? { pathLength: 1 } : {}}
              transition={animated ? { duration: 2, delay: 0.5 } : {}}
            />
            
            {/* Process nodes */}
            <motion.circle
              cx="40"
              cy="60"
              r="8"
              fill="var(--primary)"
              initial={animated ? { scale: 0 } : {}}
              animate={animated ? { scale: 1 } : {}}
              transition={animated ? { duration: 0.3, delay: 1 } : {}}
            />
            <motion.circle
              cx="140"
              cy="60"
              r="8"
              fill="var(--secondary)"
              initial={animated ? { scale: 0 } : {}}
              animate={animated ? { scale: 1 } : {}}
              transition={animated ? { duration: 0.3, delay: 1.3 } : {}}
            />
            <motion.circle
              cx="220"
              cy="60"
              r="8"
              fill="var(--tertiary)"
              initial={animated ? { scale: 0 } : {}}
              animate={animated ? { scale: 1 } : {}}
              transition={animated ? { duration: 0.3, delay: 1.6 } : {}}
            />
            <motion.circle
              cx="320"
              cy="60"
              r="8"
              fill="var(--primary)"
              initial={animated ? { scale: 0 } : {}}
              animate={animated ? { scale: 1 } : {}}
              transition={animated ? { duration: 0.3, delay: 1.9 } : {}}
            />

            {/* Labels */}
            <text x="40" y="85" textAnchor="middle" className="text-xs fill-current text-on-surface-variant">
              Discover
            </text>
            <text x="140" y="85" textAnchor="middle" className="text-xs fill-current text-on-surface-variant">
              Design
            </text>
            <text x="220" y="85" textAnchor="middle" className="text-xs fill-current text-on-surface-variant">
              Build
            </text>
            <text x="320" y="85" textAnchor="middle" className="text-xs fill-current text-on-surface-variant">
              Automate
            </text>
          </motion.g>
        </svg>
      </div>
    );
  }

  if (variant === 'connection') {
    return (
      <div className={`inline-block ${className}`}>
        <svg
          width="200"
          height="100"
          viewBox="0 0 200 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-40"
        >
          {/* Connecting lines between elements */}
          <motion.g
            initial={animated ? { opacity: 0 } : {}}
            animate={animated ? { opacity: 1 } : {}}
            transition={animated ? { duration: 0.8, delay: 0.2 } : {}}
          >
            <motion.path
              d="M20 25 Q100 15, 180 25"
              stroke="var(--outline)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="2,3"
              initial={animated ? { pathLength: 0 } : {}}
              animate={animated ? { pathLength: 1 } : {}}
              transition={animated ? { duration: 1.5, delay: 0.5 } : {}}
            />
            <motion.path
              d="M20 50 Q100 40, 180 50"
              stroke="var(--outline)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="2,3"
              initial={animated ? { pathLength: 0 } : {}}
              animate={animated ? { pathLength: 1 } : {}}
              transition={animated ? { duration: 1.5, delay: 0.8 } : {}}
            />
            <motion.path
              d="M20 75 Q100 65, 180 75"
              stroke="var(--outline)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="2,3"
              initial={animated ? { pathLength: 0 } : {}}
              animate={animated ? { pathLength: 1 } : {}}
              transition={animated ? { duration: 1.5, delay: 1.1 } : {}}
            />
          </motion.g>
        </svg>
      </div>
    );
  }

  // Default flow variant
  return (
    <div className={`inline-block ${className}`}>
      <svg
        width={direction === 'horizontal' ? '300' : '120'}
        height={direction === 'horizontal' ? '120' : '300'}
        viewBox={direction === 'horizontal' ? '0 0 300 120' : '0 0 120 300'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-50"
      >
        <motion.g
          initial={animated ? { opacity: 0 } : {}}
          animate={animated ? { opacity: 1 } : {}}
          transition={animated ? { duration: 1, delay: 0.2 } : {}}
        >
          {direction === 'horizontal' ? (
            <>
              {/* Horizontal flowing lines */}
              <motion.path
                d="M20 40 Q150 20, 280 40"
                stroke="var(--primary)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="8,6"
                initial={animated ? { pathLength: 0 } : {}}
                animate={animated ? { pathLength: 1 } : {}}
                transition={animated ? { duration: 2, delay: 0.3 } : {}}
              />
              <motion.path
                d="M20 60 Q150 80, 280 60"
                stroke="var(--secondary)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="8,6"
                initial={animated ? { pathLength: 0 } : {}}
                animate={animated ? { pathLength: 1 } : {}}
                transition={animated ? { duration: 2, delay: 0.6 } : {}}
              />
              <motion.path
                d="M20 80 Q150 60, 280 80"
                stroke="var(--tertiary)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4,4"
                initial={animated ? { pathLength: 0 } : {}}
                animate={animated ? { pathLength: 1 } : {}}
                transition={animated ? { duration: 2, delay: 0.9 } : {}}
              />
            </>
          ) : (
            <>
              {/* Vertical flowing lines */}
              <motion.path
                d="M40 20 Q20 150, 40 280"
                stroke="var(--primary)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="8,6"
                initial={animated ? { pathLength: 0 } : {}}
                animate={animated ? { pathLength: 1 } : {}}
                transition={animated ? { duration: 2, delay: 0.3 } : {}}
              />
              <motion.path
                d="M60 20 Q80 150, 60 280"
                stroke="var(--secondary)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="8,6"
                initial={animated ? { pathLength: 0 } : {}}
                animate={animated ? { pathLength: 1 } : {}}
                transition={animated ? { duration: 2, delay: 0.6 } : {}}
              />
              <motion.path
                d="M80 20 Q60 150, 80 280"
                stroke="var(--tertiary)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4,4"
                initial={animated ? { pathLength: 0 } : {}}
                animate={animated ? { pathLength: 1 } : {}}
                transition={animated ? { duration: 2, delay: 0.9 } : {}}
              />
            </>
          )}

          {/* Flowing particles */}
          {animated && (
            <motion.g>
              <motion.circle
                cx="0"
                cy="0"
                r="3"
                fill="var(--primary)"
                opacity="0.6"
                animate={{
                  x: direction === 'horizontal' ? [20, 280] : [40, 40],
                  y: direction === 'horizontal' ? [40, 40] : [20, 280],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 1,
                }}
              />
              <motion.circle
                cx="0"
                cy="0"
                r="2"
                fill="var(--secondary)"
                opacity="0.4"
                animate={{
                  x: direction === 'horizontal' ? [20, 280] : [60, 60],
                  y: direction === 'horizontal' ? [60, 60] : [20, 280],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 1.5,
                }}
              />
            </motion.g>
          )}
        </motion.g>
      </svg>
    </div>
  );
};