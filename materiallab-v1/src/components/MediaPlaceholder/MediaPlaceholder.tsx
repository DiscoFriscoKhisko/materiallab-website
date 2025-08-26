import { motion } from 'framer-motion';
import { MLText } from '../ML';

interface MediaPlaceholderProps {
  type: 'video' | 'carousel' | 'gallery' | 'image';
  title: string;
  description: string;
  specs?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide';
  className?: string;
}

export const MediaPlaceholder = ({
  type,
  title,
  description,
  specs,
  aspectRatio = 'video',
  className = ''
}: MediaPlaceholderProps) => {
  const aspectRatioClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[21/9]'
  };

  const getIcon = () => {
    switch (type) {
      case 'video':
        return (
          <svg className="w-12 h-12 text-ion" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'carousel':
        return (
          <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case 'gallery':
        return (
          <svg className="w-12 h-12 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-12 h-12 text-ion" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`${aspectRatioClasses[aspectRatio]} bg-surface-2 rounded-lg border-2 border-dashed border-glass-light flex items-center justify-center p-6 overflow-hidden`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <defs>
              <pattern id={`grid-${type}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${type})`} />
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-md">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-4"
          >
            {getIcon()}
          </motion.div>
          
          <MLText variant="bodyM" className="font-medium mb-2">
            {title}
          </MLText>
          
          <MLText variant="bodyS" color="weak" className="mb-3 text-center">
            {description}
          </MLText>
          
          {specs && (
            <MLText variant="caption" color="weaker" className="text-center italic">
              {specs}
            </MLText>
          )}
          
          {/* Interactive indicators based on type */}
          {type === 'carousel' && (
            <div className="flex justify-center space-x-2 mt-4">
              {[0, 1, 2, 3].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-2 h-2 rounded-full bg-text-weaker"
                  animate={{ 
                    backgroundColor: dot === 0 ? 'var(--interactive-accent)' : 'var(--text-weaker)',
                    scale: dot === 0 ? 1.2 : 1
                  }}
                  transition={{ 
                    duration: 0.5,
                    delay: dot * 0.5,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                />
              ))}
            </div>
          )}
          
          {type === 'video' && (
            <motion.div
              className="mt-4 inline-flex items-center space-x-2 text-text-weaker"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-3 h-3 bg-current rounded-full" />
              <MLText variant="caption">Auto-playing video content</MLText>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};