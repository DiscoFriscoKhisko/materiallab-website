import { motion } from 'framer-motion';
import { type ReactNode, forwardRef, useState, useRef, useEffect } from 'react';
import { MediaPlaceholder } from '../MediaPlaceholder/MediaPlaceholder';

interface MLVideoProps {
  src: string | string[];
  poster?: string;
  title?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide';
  showControls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsinline?: boolean;
  lazy?: boolean;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  children?: ReactNode;
}

export const MLVideo = forwardRef<HTMLVideoElement, MLVideoProps>(({
  src,
  poster,
  title,
  aspectRatio = 'video',
  showControls = false,
  autoplay = true,
  loop = true,
  muted = true,
  playsinline = true,
  lazy = true,
  className = '',
  onLoad,
  onError,
  children,
  ...props
}, ref) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isInView, setIsInView] = useState(!lazy);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Combine refs
  useEffect(() => {
    if (ref && videoRef.current) {
      if (typeof ref === 'function') {
        ref(videoRef.current);
      } else {
        ref.current = videoRef.current;
      }
    }
  }, [ref]);

  // Aspect ratio classes
  const aspectRatioClasses = {
    video: 'aspect-video',
    square: 'aspect-square', 
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[21/9]'
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  // Video event handlers
  const handleLoadedData = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  // Normalize src to array
  const sources = Array.isArray(src) ? src : [src];

  // Show placeholder if loading, error, or not in view
  if (!isInView || hasError || (isLoading && !poster)) {
    return (
      <div ref={containerRef} className={className}>
        <MediaPlaceholder
          type="video"
          title={title || "Video Content"}
          description={hasError ? "Failed to load video" : "Loading video..."}
          aspectRatio={aspectRatio}
          specs="Auto-playing • Muted • Looping"
        />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative group ${aspectRatioClasses[aspectRatio]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Element */}
      <motion.video
        ref={videoRef}
        className="w-full h-full object-cover rounded-lg"
        poster={poster}
        autoPlay={autoplay && muted} // Autoplay only works when muted
        loop={loop}
        muted={muted}
        playsInline={playsinline}
        onLoadedData={handleLoadedData}
        onError={handleError}
        onPlay={handlePlay}
        onPause={handlePause}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        {...(props as any)}
      >
        {sources.map((source, index) => {
          const getVideoType = (url: string) => {
            if (url.includes('.webm')) return 'video/webm';
            if (url.includes('.ogg')) return 'video/ogg';
            return 'video/mp4';
          };

          return (
            <source
              key={index}
              src={source}
              type={getVideoType(source)}
            />
          );
        })}
        Your browser does not support the video tag.
      </motion.video>

      {/* Loading Overlay */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-surface-2 rounded-lg flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center space-y-3">
            <motion.div
              className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <span className="text-sm text-on-surface-variant">Loading video...</span>
          </div>
        </motion.div>
      )}

      {/* Controls Overlay */}
      {showControls && !isLoading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-lg flex items-center justify-center cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          onClick={togglePlayPause}
        >
          <motion.div
            className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {isPlaying ? (
              <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Custom overlay content */}
      {children && (
        <div className="absolute inset-0 pointer-events-none">
          {children}
        </div>
      )}
    </div>
  );
});

MLVideo.displayName = 'MLVideo';