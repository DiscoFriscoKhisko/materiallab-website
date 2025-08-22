import { motion } from 'framer-motion';
import { MLText, MLHeading } from '../ML';

interface WhatsAppCTAProps {
  phoneNumber: string;
  message?: string;
  variant?: 'card' | 'fab' | 'inline';
  className?: string;
}

const WhatsAppIcon = () => (
  <svg 
    className="w-6 h-6" 
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

export const WhatsAppCTA = ({ 
  phoneNumber, 
  message = 'Hi MaterialLab! I\'d like to discuss a project.',
  variant = 'card',
  className = '' 
}: WhatsAppCTAProps) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  if (variant === 'fab') {
    return (
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
          bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white
          flex items-center justify-center shadow-elevation-3
          hover:shadow-elevation-4 transition-all duration-300
          ${className}
        `}
        whileHover={{ 
          scale: 1.1,
          rotate: 5,
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5, 
          type: "spring", 
          stiffness: 200 
        }}
        aria-label="Chat on WhatsApp"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <WhatsAppIcon />
        </motion.div>

        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#25D366]"
          animate={{
            scale: [1, 2],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#25D366]"
          animate={{
            scale: [1, 2],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5,
          }}
        />
      </motion.a>
    );
  }

  if (variant === 'inline') {
    return (
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          inline-flex items-center gap-3 px-6 py-3 rounded-full
          bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white
          hover:from-[#20B558] hover:to-[#0F6B5C]
          transition-all duration-300 text-sm font-medium
          shadow-elevation-1 hover:shadow-elevation-2
          ${className}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <WhatsAppIcon />
        <span>Chat on WhatsApp</span>
      </motion.a>
    );
  }

  // Default: card variant
  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        whatsapp-cta-card block p-8 rounded-2xl
        bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white
        hover:from-[#20B558] hover:to-[#0F6B5C]
        transition-all duration-300 group
        shadow-elevation-2 hover:shadow-elevation-3
        glow-noise relative overflow-hidden
        ${className}
      `}
      whileHover={{ 
        y: -4,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern id="whatsapp-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="currentColor" />
          </pattern>
          <rect width="100" height="100" fill="url(#whatsapp-pattern)" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <motion.div
            className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm"
            whileHover={{ 
              rotate: 5,
              scale: 1.1,
            }}
            transition={{ duration: 0.3 }}
          >
            <WhatsAppIcon />
          </motion.div>
          
          <div className="flex-1">
            <MLHeading level={4} className="text-white mb-2">
              Chat with us instantly
            </MLHeading>
            <MLText className="text-white/80 leading-relaxed">
              Get answers in real-time via WhatsApp. We typically respond within minutes.
            </MLText>
          </div>

          {/* Arrow */}
          <motion.div
            className="text-white/60 group-hover:text-white transition-colors duration-300"
            animate={{ 
              x: [0, 4, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>

        {/* Features */}
        <div className="space-y-3">
          {[
            'Instant responses',
            'Share files & images',
            'Direct to experts',
          ].map((feature, index) => (
            <motion.div
              key={feature}
              className="flex items-center gap-3 text-white/90"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <span className="text-sm">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.a>
  );
};