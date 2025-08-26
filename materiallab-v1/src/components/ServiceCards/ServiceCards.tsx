import { motion } from 'framer-motion';
import { MLCard, MLText, MLHeading } from '../ML';
import { useStaggeredIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface Service {
  title: string;
  description: string;
  items: string[];
  icon: string;
  color: string;
}

interface ServiceCardsProps {
  services: Service[];
  variant?: 'certain' | 'explorative';
}

export const ServiceCards = ({ services, variant = 'certain' }: ServiceCardsProps) => {
  const { setElementRef, visibleItems } = useStaggeredIntersectionObserver(services.length, { threshold: 0.2 });
  const getIconBg = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'from-ion/20 to-ion/40',
      green: 'from-success/20 to-success/40',
      purple: 'from-ion/20 to-primary/40',
      orange: 'from-primary/20 to-primary/40',
      indigo: 'from-ion/20 to-ion/40',
    };
    return colorMap[color] || colorMap.blue;
  };

  const getIconColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'text-ion',
      green: 'text-success',
      purple: 'text-ion',
      orange: 'text-primary',
      indigo: 'text-ion',
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="grid gap-veo-6 md:gap-veo-6">
      {services.map((service, index) => (
        <div 
          key={index}
          ref={setElementRef(index)}
          className={`fade-in ${index > 0 ? `stagger-${Math.min(index, 5)}` : ''} ${visibleItems[index] ? 'is-visible' : ''}`}
        >
          <MLCard 
            className="p-veo-6 md:p-veo-8 shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-300" 
            variant={service.color === 'orange' || service.color === 'blue' ? 'glow-primary' : 'glow-ion'}
            hover={true}
          >
            <div className="flex items-start space-x-veo-6">
              <motion.div 
                className={`w-veo-10 h-veo-10 bg-gradient-to-br ${getIconBg(service.color)} rounded-veo-xl flex items-center justify-center flex-shrink-0 shadow-elevation-2 hover:shadow-elevation-3 relative overflow-hidden border border-white/10`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className={`text-2xl ${getIconColor(service.color)}`}>{service.icon}</span>
              </motion.div>
              
              <div className="flex-1">
                <MLHeading level={3} className="mb-veo-3 font-semibold text-xl md:text-2xl">
                  {service.title}
                </MLHeading>
                <MLText variant="bodyL" color="weak" className="mb-veo-4 leading-relaxed">
                  {service.description}
                </MLText>
                
                <ul className="space-y-veo-2">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-veo-3">
                      <svg 
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          variant === 'certain' ? 'text-success' : 'text-ion'
                        }`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <MLText color="weak">{item}</MLText>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </MLCard>
        </div>
      ))}
    </div>
  );
};