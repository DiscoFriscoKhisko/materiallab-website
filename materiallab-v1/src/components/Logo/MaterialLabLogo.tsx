import { motion } from 'framer-motion';
import { useState } from 'react';

interface MaterialLabLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  animated?: boolean;
}

export const MaterialLabLogo = ({ 
  size = 'md', 
  showText = true,
  className = '',
  animated = true 
}: MaterialLabLogoProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizes = {
    sm: { width: 24, height: 24, fontSize: '14px' },
    md: { width: 40, height: 40, fontSize: '18px' },
    lg: { width: 56, height: 56, fontSize: '24px' }
  };

  const logoVariants = {
    initial: {
      filter: 'drop-shadow(0 0 0 rgba(26, 115, 232, 0))',
    },
    hover: {
      filter: 'drop-shadow(0 0 12px rgba(26, 115, 232, 0.4))',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const nodeVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const connectionVariants = {
    initial: { pathLength: 1, opacity: 0.6 },
    hover: { 
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    }
  };

  const { width, height, fontSize } = sizes[size];

  return (
    <div 
      className={`flex items-center space-x-3 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        variants={animated ? logoVariants : {}}
        initial="initial"
        animate={isHovered ? 'hover' : 'initial'}
        className="relative"
      >
        <motion.svg 
          width={width} 
          height={height} 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          whileHover={animated ? { rotate: 360 } : {}}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <defs>
            {/* Enhanced gradients */}
            <linearGradient id={`primaryGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#1A73E8', stopOpacity:1}} />
              <stop offset="50%" style={{stopColor:'#4285F4', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#8E24AA', stopOpacity:1}} />
            </linearGradient>
            <linearGradient id={`secondaryGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#4285F4', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#9C27B0', stopOpacity:1}} />
            </linearGradient>
            <radialGradient id={`backgroundGradient-${size}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" style={{stopColor:'#1A73E8', stopOpacity:0.15}} />
              <stop offset="100%" style={{stopColor:'#8E24AA', stopOpacity:0.05}} />
            </radialGradient>
          </defs>
          
          {/* Background glow */}
          <motion.circle 
            cx="20" 
            cy="20" 
            r="18" 
            fill={`url(#backgroundGradient-${size})`}
            animate={isHovered ? { r: 20, opacity: 0.2 } : { r: 18, opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Neural network nodes */}
          <motion.circle 
            cx="12" 
            cy="12" 
            r="2.5" 
            fill={`url(#primaryGradient-${size})`}
            variants={animated ? nodeVariants : {}}
            initial="initial"
            animate={isHovered ? 'hover' : 'initial'}
            transition={{ delay: 0.1 }}
          />
          <motion.circle 
            cx="28" 
            cy="12" 
            r="2.5" 
            fill={`url(#primaryGradient-${size})`}
            variants={animated ? nodeVariants : {}}
            initial="initial"
            animate={isHovered ? 'hover' : 'initial'}
            transition={{ delay: 0.2 }}
          />
          <motion.circle 
            cx="20" 
            cy="20" 
            r="3" 
            fill={`url(#secondaryGradient-${size})`}
            variants={animated ? nodeVariants : {}}
            initial="initial"
            animate={isHovered ? 'hover' : 'initial'}
            transition={{ delay: 0.3 }}
          />
          <motion.circle 
            cx="12" 
            cy="28" 
            r="2.5" 
            fill={`url(#primaryGradient-${size})`}
            variants={animated ? nodeVariants : {}}
            initial="initial"
            animate={isHovered ? 'hover' : 'initial'}
            transition={{ delay: 0.4 }}
          />
          <motion.circle 
            cx="28" 
            cy="28" 
            r="2.5" 
            fill={`url(#primaryGradient-${size})`}
            variants={animated ? nodeVariants : {}}
            initial="initial"
            animate={isHovered ? 'hover' : 'initial'}
            transition={{ delay: 0.5 }}
          />
          
          {/* Neural network connections with animation */}
          <motion.path 
            d="M12 12 L20 20 L28 12" 
            stroke={`url(#primaryGradient-${size})`} 
            strokeWidth="1.5" 
            fill="none"
            variants={animated ? connectionVariants : {}}
            initial="initial"
            animate={isHovered ? 'hover' : 'initial'}
          />
          <motion.path 
            d="M12 28 L20 20 L28 28" 
            stroke={`url(#primaryGradient-${size})`} 
            strokeWidth="1.5" 
            fill="none"
            variants={animated ? connectionVariants : {}}
            initial="initial"
            animate={isHovered ? 'hover' : 'initial'}
            transition={{ delay: 0.1 }}
          />
          <motion.path 
            d="M12 12 L12 28" 
            stroke={`url(#primaryGradient-${size})`} 
            strokeWidth="1.5" 
            fill="none"
            opacity="0.4"
            variants={animated ? connectionVariants : {}}
            initial="initial"
            animate={isHovered ? 'hover' : 'initial'}
            transition={{ delay: 0.2 }}
          />
          <motion.path 
            d="M28 12 L28 28" 
            stroke={`url(#primaryGradient-${size})`} 
            strokeWidth="1.5" 
            fill="none"
            opacity="0.4"
            variants={animated ? connectionVariants : {}}
            initial="initial"
            animate={isHovered ? 'hover' : 'initial'}
            transition={{ delay: 0.3 }}
          />
          
          {/* Central ML text */}
          <motion.text 
            x="20" 
            y="25" 
            textAnchor="middle" 
            fill="white" 
            fontFamily="system-ui, -apple-system, sans-serif" 
            fontSize="8" 
            fontWeight="600"
            animate={isHovered ? { fill: '#ffffff', textShadow: '0 0 8px rgba(255,255,255,0.8)' } : { fill: 'white' }}
            transition={{ duration: 0.3 }}
          >
            ML
          </motion.text>
        </motion.svg>
      </motion.div>

      {showText && (
        <motion.span 
          className="font-veo font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200"
          style={{ fontSize }}
          animate={isHovered ? { color: '#1A73E8' } : { color: '#111827' }}
          transition={{ duration: 0.3 }}
        >
          MaterialLab
        </motion.span>
      )}
    </div>
  );
};