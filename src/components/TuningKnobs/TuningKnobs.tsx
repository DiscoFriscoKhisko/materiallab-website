import { motion } from 'framer-motion';
import { useState } from 'react';

interface TuningKnobsProps {
  className?: string;
  variant?: 'calibration' | 'precision' | 'optimization';
}

export const TuningKnobs = ({ className = '', variant = 'calibration' }: TuningKnobsProps) => {
  const [activeKnob, setActiveKnob] = useState<number | null>(null);

  const knobConfigs = {
    calibration: [
      { label: 'Precision', value: 75, color: 'var(--primary)' },
      { label: 'Speed', value: 60, color: 'var(--secondary)' },
      { label: 'Quality', value: 85, color: 'var(--tertiary)' }
    ],
    precision: [
      { label: 'Accuracy', value: 90, color: 'var(--primary)' },
      { label: 'Efficiency', value: 70, color: 'var(--secondary)' }
    ],
    optimization: [
      { label: 'Performance', value: 80, color: 'var(--primary)' },
      { label: 'Scale', value: 65, color: 'var(--secondary)' },
      { label: 'Reliability', value: 95, color: 'var(--success)' },
      { label: 'Innovation', value: 85, color: 'var(--tertiary)' }
    ]
  };

  const knobs = knobConfigs[variant];

  return (
    <div className={`flex items-center justify-center gap-8 ${className}`}>
      {knobs.map((knob, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center gap-3"
          onHoverStart={() => setActiveKnob(index)}
          onHoverEnd={() => setActiveKnob(null)}
        >
          {/* Knob Container */}
          <motion.div
            className="relative w-16 h-16 rounded-full bg-surface-2 shadow-elevation-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Outer Ring */}
            <svg
              className="absolute inset-0 w-16 h-16 -rotate-90"
              viewBox="0 0 64 64"
            >
              {/* Background circle */}
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="var(--outline-variant)"
                strokeWidth="2"
              />
              
              {/* Progress arc */}
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke={knob.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 28}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                animate={{ 
                  strokeDashoffset: 2 * Math.PI * 28 * (1 - knob.value / 100),
                  filter: activeKnob === index ? `drop-shadow(0 0 8px ${knob.color})` : 'none'
                }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </svg>

            {/* Center Knob */}
            <motion.div
              className="absolute inset-2 rounded-full bg-surface-3 shadow-inner flex items-center justify-center"
              animate={{
                rotate: (knob.value / 100) * 270 - 135,
                boxShadow: activeKnob === index 
                  ? `inset 0 2px 4px rgba(0,0,0,0.3), 0 0 12px ${knob.color}40`
                  : 'inset 0 2px 4px rgba(0,0,0,0.3)'
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Knob Indicator */}
              <div 
                className="w-1 h-4 rounded-full"
                style={{ backgroundColor: knob.color }}
              />
            </motion.div>

            {/* Value Display */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-xs font-mono font-medium text-on-surface-variant"
              initial={{ opacity: 0 }}
              animate={{ opacity: activeKnob === index ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {knob.value}%
            </motion.div>
          </motion.div>

          {/* Label */}
          <motion.span
            className="text-label font-medium text-center"
            style={{ 
              color: activeKnob === index ? knob.color : 'var(--on-surface-variant)' 
            }}
            animate={{ 
              scale: activeKnob === index ? 1.05 : 1,
              color: activeKnob === index ? knob.color : 'var(--on-surface-variant)'
            }}
            transition={{ duration: 0.2 }}
          >
            {knob.label}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
};

// Assembly component for hero sections
export const TuningKnobsAssembly = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Main knobs */}
      <TuningKnobs variant="optimization" />
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 400 100">
        {[0, 1, 2].map((i) => (
          <motion.line
            key={i}
            x1={100 + i * 100}
            y1="50"
            x2={150 + i * 100}
            y2="50"
            stroke="var(--primary)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
};

// Minimal single knob for subtle use
export const SingleTuningKnob = ({ 
  className = '', 
  size = 24, 
  value = 0.5,
  color = 'var(--primary)'
}: { 
  className?: string;
  size?: number;
  value?: number; // 0 to 1
  color?: string;
}) => {
  const rotation = -135 + (value * 270); // Maps 0-1 to -135° to 135°

  return (
    <div className={`inline-block ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-60"
      >
        {/* Outer circle */}
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="var(--outline-variant)"
          strokeWidth="1"
        />
        
        {/* Value arc */}
        <motion.path
          d="M 6.343 17.657 A 8 8 0 0 1 4 12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: value }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        
        {/* Knob indicator */}
        <motion.g
          initial={{ rotate: -135 }}
          animate={{ rotate: rotation }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ transformOrigin: '12px 12px' }}
        >
          <line
            x1="12"
            y1="6"
            x2="12"
            y2="9"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.g>
        
        {/* Center dot */}
        <circle
          cx="12"
          cy="12"
          r="2"
          fill={color}
          opacity="0.6"
        />
      </svg>
    </div>
  );
};