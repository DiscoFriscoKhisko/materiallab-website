import { useState } from 'react';
import { motion } from 'framer-motion';

interface VeoImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  aspectRatio?: '1:1' | '4:3' | '16:9' | '3:2' | '21:9';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const VeoImage = ({
  src,
  alt,
  placeholder,
  aspectRatio = '16:9',
  objectFit = 'cover',
  loading = 'lazy',
  className = '',
  priority = false,
  onLoad,
  onError
}: VeoImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectRatioClasses = {
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-video',
    '3:2': 'aspect-[3/2]',
    '21:9': 'aspect-[21/9]'
  };

  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down'
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Create placeholder with gradient and subtle pattern
  const defaultPlaceholder = `data:image/svg+xml;base64,${btoa(`
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" stroke-width="1" opacity="0.3"/>
        </pattern>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#8A63D2;stop-opacity:0.1" />
          <stop offset="100%" style="stop-color:#55C2FF;stop-opacity:0.1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <rect width="100%" height="100%" fill="url(#grid)"/>
      <text x="50%" y="50%" font-family="system-ui, sans-serif" font-size="18" fill="#6B7280" text-anchor="middle" dy="0.3em">
        ${alt || 'Image placeholder'}
      </text>
    </svg>
  `)}`;

  return (
    <div className={`relative overflow-hidden ${aspectRatioClasses[aspectRatio]} ${className}`}>
      {/* Placeholder/Loading state */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 bg-surface-2 flex items-center justify-center">
          {hasError ? (
            <div className="text-center text-on-surface-variant p-4">
              <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Image failed to load</p>
            </div>
          ) : (
            <motion.img
              src={placeholder || defaultPlaceholder}
              alt=""
              className={`w-full h-full ${objectFitClasses[objectFit]} blur-sm`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          
          {!hasError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      )}

      {/* Actual image */}
      {!hasError && (
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : loading}
          className={`w-full h-full ${objectFitClasses[objectFit]} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          initial={false}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
};

// Hero image with overlay support
interface VeoHeroImageProps extends VeoImageProps {
  overlay?: 'none' | 'light' | 'medium' | 'dark';
  children?: React.ReactNode;
}

export const VeoHeroImage = ({
  children,
  overlay = 'medium',
  className = '',
  ...imageProps
}: VeoHeroImageProps) => {
  const overlayClasses = {
    none: '',
    light: 'after:absolute after:inset-0 after:bg-black/20',
    medium: 'after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/60 after:via-black/20 after:to-transparent',
    dark: 'after:absolute after:inset-0 after:bg-black/50'
  };

  return (
    <div className={`relative ${overlayClasses[overlay]} ${className}`}>
      <VeoImage {...imageProps} />
      {children && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {children}
        </div>
      )}
    </div>
  );
};

// Gallery image with zoom effect
export const VeoGalleryImage = ({
  className = '',
  ...imageProps
}: VeoImageProps) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg cursor-pointer ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <VeoImage {...imageProps} />
      <motion.div
        className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300"
        whileHover={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
      />
    </motion.div>
  );
};

// Generate placeholder URLs for different use cases
export const generatePlaceholder = (width: number, height: number, text: string = '') => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" stroke-width="1" opacity="0.3"/>
        </pattern>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#8A63D2;stop-opacity:0.1" />
          <stop offset="100%" style="stop-color:#55C2FF;stop-opacity:0.1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <rect width="100%" height="100%" fill="url(#grid)"/>
      <text x="50%" y="50%" font-family="system-ui, sans-serif" font-size="16" fill="#6B7280" text-anchor="middle" dy="0.3em">
        ${text || `${width} × ${height}`}
      </text>
    </svg>
  `)}`;
};

// Predefined placeholder images
export const PLACEHOLDER_IMAGES = {
  hero: generatePlaceholder(1920, 1080, 'Hero Background'),
  feature: generatePlaceholder(600, 400, 'Feature Image'),
  card: generatePlaceholder(400, 300, 'Card Image'),
  avatar: generatePlaceholder(120, 120, 'Avatar'),
  logo: generatePlaceholder(200, 80, 'Logo'),
  gallery: generatePlaceholder(800, 600, 'Gallery Image'),
  thumbnail: generatePlaceholder(200, 150, 'Thumbnail')
};