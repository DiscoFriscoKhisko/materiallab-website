import { motion } from 'framer-motion';
import { MLText, MLHeading, MLButton } from '../ML';
import { type CarouselItem } from './VeoCarousel';

interface VeoCarouselCardProps {
  item: CarouselItem;
  isActive: boolean;
  index: number;
}

export const VeoCarouselCard = ({ item, isActive, index }: VeoCarouselCardProps) => {
  const gradientVariant = item.gradient || 'primary';

  return (
    <motion.div
      className={`
        veo-carousel-card flex-shrink-0 w-[350px] h-[400px] relative
        glow-gradient-${gradientVariant} glow-noise
        rounded-3xl p-8 cursor-pointer
        transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isActive ? 'opacity-100' : 'opacity-70'}
      `}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ 
        opacity: isActive ? 1 : 0.7,
        y: 0, 
        scale: isActive ? 1 : 0.95,
      }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      whileHover={isActive ? {
        scale: 1.02,
        y: -8,
        transition: { duration: 0.3 }
      } : {}}
      whileTap={isActive ? { scale: 0.98 } : {}}
      role="article"
      aria-label={`Card ${index + 1}: ${item.title}`}
    >
      {/* Icon */}
      {item.icon && (
        <motion.div
          className="icon-container mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-on-surface/10"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.1 + 0.2,
            type: "spring",
            stiffness: 200,
          }}
        >
          <div className="text-2xl text-primary">
            {item.icon}
          </div>
        </motion.div>
      )}

      {/* Media */}
      {item.media && (
        <motion.div
          className="media-container mb-6 rounded-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.1 + 0.3,
          }}
        >
          {item.media.type === 'video' ? (
            <video
              className="w-full h-32 object-cover"
              poster={item.media.poster}
              muted
              autoPlay
              loop
              playsInline
            >
              <source src={item.media.src} type="video/mp4" />
            </video>
          ) : (
            <img
              src={item.media.src}
              alt=""
              className="w-full h-32 object-cover"
              loading="lazy"
            />
          )}
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        className="content-area flex flex-col justify-between h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1 + 0.4,
        }}
      >
        {/* Title */}
        <MLHeading 
          level={4} 
          className="mb-3 text-on-surface leading-snug"
        >
          {item.title}
        </MLHeading>

        {/* Description */}
        <MLText 
          variant="bodyM" 
          color="weak" 
          className="mb-6 flex-1 leading-relaxed"
        >
          {item.description}
        </MLText>

        {/* Metric */}
        {item.metric && (
          <motion.div
            className="metric-display mb-4 p-3 bg-on-surface/5 rounded-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1 + 0.5,
            }}
          >
            <MLHeading level={4} className="text-primary mb-1">
              {item.metric.value}
            </MLHeading>
            <MLText variant="bodyS" color="weak">
              {item.metric.label}
            </MLText>
          </motion.div>
        )}

        {/* CTA Button */}
        {item.cta && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1 + 0.6,
            }}
          >
            <MLButton
              variant="text"
              size="sm"
              onClick={item.cta.onClick}
              iconRight={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              }
              className="text-primary hover:text-primary-strong p-0"
            >
              {item.cta.label}
            </MLButton>
          </motion.div>
        )}
      </motion.div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at 50% 0%, rgba(var(--primary-rgb), 0.05), transparent 60%)`,
        }}
      />

      {/* Focus Ring */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-transparent"
        whileFocus={{ borderColor: 'var(--primary)' }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};