import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './UI';
import { useNavigate } from 'react-router-dom';

interface VeoHeroProps {
  title: string;
  subtitle: string;
  videoSrc?: string;
  fallbackImage?: string;
  primaryCta?: {
    text: string;
    path: string;
  };
  secondaryCta?: {
    text: string;
    path: string;
  };
  className?: string;
}

export const VeoHero = ({
  title,
  subtitle,
  videoSrc = "https://cdn.pixabay.com/vimeo/395498881/technology-29411.mp4",
  fallbackImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  primaryCta,
  secondaryCta,
  className = ""
}: VeoHeroProps) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadeddata', () => setVideoLoaded(true));
      video.addEventListener('error', () => setVideoError(true));
    }

    return () => {
      if (video) {
        video.removeEventListener('loadeddata', () => setVideoLoaded(true));
        video.removeEventListener('error', () => setVideoError(true));
      }
    };
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Video Background */}
      {!videoError && (
        <motion.video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          poster={fallbackImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: videoLoaded ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <source src={videoSrc} type="video/mp4" />
        </motion.video>
      )}

      {/* Fallback Background Image */}
      {(videoError || !videoLoaded) && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${fallbackImage})` }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-veo-video-overlay via-veo-video-overlay to-veo-video-overlay-strong" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main Title */}
          <h1 
            className="font-veo text-veo-text-hero font-light mb-6 tracking-tight"
            style={{ 
              textShadow: 'var(--veo-hero-text-shadow)',
              lineHeight: '1.1'
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p 
            className="font-veo text-veo-text-title font-normal mb-12 max-w-2xl mx-auto leading-relaxed opacity-90"
            style={{ textShadow: 'var(--veo-hero-text-shadow)' }}
          >
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {primaryCta && (
              <Button
                variant="filled"
                size="lg"
                onClick={() => navigate(primaryCta.path)}
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105"
              >
                {primaryCta.text}
              </Button>
            )}
            
            {secondaryCta && (
              <Button
                variant="outlined"
                size="lg"
                onClick={() => navigate(secondaryCta.path)}
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105"
              >
                {secondaryCta.text}
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        onClick={scrollToContent}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-sm font-veo mb-2 opacity-80">Scroll to explore</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Video Loading Indicator */}
      {!videoLoaded && !videoError && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-gray-900"
          initial={{ opacity: 1 }}
          animate={{ opacity: videoLoaded ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </motion.div>
      )}

      {/* Performance Hints */}
      <link rel="preload" as="video" href={videoSrc} />
      <link rel="preload" as="image" href={fallbackImage} />
    </section>
  );
};

// Default props for MaterialLab content
VeoHero.defaultProps = {
  title: "AI Product Studio",
  subtitle: "Building next-generation AI experiences that solve real problems. From concept to deployment, we're your technical partner.",
  primaryCta: {
    text: "View Our Work",
    path: "/work"
  },
  secondaryCta: {
    text: "Start a Project",
    path: "/contact"
  }
};