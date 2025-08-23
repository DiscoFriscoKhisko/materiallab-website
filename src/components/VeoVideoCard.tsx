import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VeoIcon } from './VeoIcon';

interface VeoVideoCardProps {
  title: string;
  description: string;
  prompt?: string;
  videoSrc: string;
  posterSrc?: string;
  aspectRatio?: '16:9' | '9:16' | '1:1';
  autoPlay?: boolean;
  showControls?: boolean;
  lazy?: boolean; // Enable lazy loading
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
}

export const VeoVideoCard = ({
  title,
  description,
  prompt,
  videoSrc,
  posterSrc,
  aspectRatio = '16:9',
  autoPlay = false,
  showControls = true,
  lazy = true, // Enable lazy loading by default
  className = '',
  onPlay,
  onPause
}: VeoVideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(!lazy);

  const aspectRatioClasses = {
    '16:9': 'aspect-video',
    '9:16': 'aspect-[9/16]',
    '1:1': 'aspect-square'
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || shouldLoadVideo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px 0px' // Start loading 100px before element becomes visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, shouldLoadVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setShowPlayButton(false);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      setShowPlayButton(true);
      onPause?.();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setShowPlayButton(true);
      setProgress(0);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onPlay, onPause, shouldLoadVideo]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`group relative bg-white rounded-xl overflow-hidden transition-all duration-200 ease-out ${className}`}
      style={{ 
        boxShadow: 'var(--elevation-2)',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: 'var(--elevation-3)'
      }}
      transition={{
        duration: 0.2,
        ease: [0.05, 0.7, 0.1, 1]
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Video Container */}
      <div className={`relative ${aspectRatioClasses[aspectRatio]} overflow-hidden`}>
        {shouldLoadVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            poster={posterSrc}
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          // Placeholder while video loads
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: posterSrc ? `url(${posterSrc})` : 'none' }}
          >
            {!posterSrc && (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div className="text-gray-400">
                  <VeoIcon size="lg">
                    <polygon points="9,8 19,12 9,16" />
                  </VeoIcon>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Video Overlay Controls */}
        <AnimatePresence>
          {(showPlayButton || isHovered) && showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center"
            >
              {/* Play/Pause Button */}
              {showPlayButton && (
                <motion.button
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full flex items-center justify-center text-gray-900 transition-all duration-200 ease-out relative overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: 'var(--elevation-2)',
                    backdropFilter: 'blur(10px)'
                  }}
                  whileHover={{ 
                    scale: 1.08,
                    boxShadow: 'var(--elevation-3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    duration: 0.15,
                    ease: [0.05, 0.7, 0.1, 1]
                  }}
                >
                  <VeoIcon size="lg">
                    <polygon points="9,8 19,12 9,16" />
                  </VeoIcon>
                  {/* Button state layer */}
                  <span className="absolute inset-0 bg-gray-900/0 hover:bg-gray-900/4 active:bg-gray-900/8 rounded-full transition-colors duration-150" />
                </motion.button>
              )}

              {/* Video Controls */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {/* Mute/Unmute */}
                <motion.button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-200 ease-out relative overflow-hidden"
                  style={{
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: 'var(--elevation-1)'
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    background: 'rgba(0, 0, 0, 0.75)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    duration: 0.15,
                    ease: [0.05, 0.7, 0.1, 1]
                  }}
                >
                  <VeoIcon size="sm">
                    {isMuted ? (
                      <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6m0-6l6 6" />
                    ) : (
                      <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
                    )}
                  </VeoIcon>
                  {/* Button state layer */}
                  <span className="absolute inset-0 bg-white/0 hover:bg-white/8 active:bg-white/12 rounded-full transition-colors duration-150" />
                </motion.button>

                {/* Fullscreen */}
                <motion.button
                  onClick={handleFullscreen}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-200 ease-out relative overflow-hidden"
                  style={{
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: 'var(--elevation-1)'
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    background: 'rgba(0, 0, 0, 0.75)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    duration: 0.15,
                    ease: [0.05, 0.7, 0.1, 1]
                  }}
                >
                  <VeoIcon size="sm">
                    <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
                  </VeoIcon>
                  {/* Button state layer */}
                  <span className="absolute inset-0 bg-white/0 hover:bg-white/8 active:bg-white/12 rounded-full transition-colors duration-150" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-30">
            <motion.div
              className="h-full"
              style={{ 
                width: `${progress}%`,
                background: '#1a73e8',
                boxShadow: '0 0 4px rgba(26, 115, 232, 0.4)'
              }}
              transition={{ 
                duration: 0.1,
                ease: 'linear'
              }}
            />
          </div>
        )}

        {/* AI Prompt Overlay */}
        {prompt && (
          <motion.div
            className="absolute top-4 left-4 max-w-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0.8, y: 0 }}
            transition={{ 
              duration: 0.3,
              ease: [0.05, 0.7, 0.1, 1]
            }}
          >
            <div 
              className="rounded-lg px-3 py-2"
              style={{
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(12px)',
                boxShadow: 'var(--elevation-1)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <p 
                className="text-white font-veo"
                style={{ fontSize: 'var(--veo-text-body-small)' }}
              >
                <span 
                  className="font-medium"
                  style={{ color: '#87ceeb' }}
                >
                  Prompt: 
                </span>
                <span className="ml-1">"{prompt}"</span>
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 
          className="font-veo font-medium text-gray-900 mb-2"
          style={{ 
            fontSize: 'var(--veo-text-headline-small)',
            lineHeight: '1.3'
          }}
        >
          {title}
        </h3>
        <p 
          className="font-veo text-gray-600 leading-relaxed"
          style={{ 
            fontSize: 'var(--veo-text-body-large)',
            lineHeight: '1.5'
          }}
        >
          {description}
        </p>
      </div>

      {/* Loading State */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 opacity-0 group-hover:opacity-0 transition-opacity">
        <div className="animate-pulse">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );
};