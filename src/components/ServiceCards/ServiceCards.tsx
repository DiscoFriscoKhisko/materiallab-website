import { motion } from 'framer-motion';
import { MLCard, MLText, MLHeading } from '../ML';

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
  const getIconBg = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'from-ion/20 to-ion/40',
      green: 'from-success/20 to-success/40',
      purple: 'from-ion/20 to-coral/40',
      orange: 'from-coral/20 to-coral/40',
      indigo: 'from-ion/20 to-ion/40',
    };
    return colorMap[color] || colorMap.blue;
  };

  const getIconColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'text-ion',
      green: 'text-success',
      purple: 'text-ion',
      orange: 'text-coral',
      indigo: 'text-ion',
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="grid gap-6 md:gap-8">
      {services.map((service, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <MLCard className="p-6 md:p-8" hover={true}>
            <div className="flex items-start space-x-6">
              <motion.div 
                className={`w-12 h-12 bg-gradient-to-br ${getIconBg(service.color)} rounded-xl flex items-center justify-center flex-shrink-0 shadow-elevation-1`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className={`text-2xl ${getIconColor(service.color)}`}>{service.icon}</span>
              </motion.div>
              
              <div className="flex-1">
                <MLHeading level={3} className="mb-3">
                  {service.title}
                </MLHeading>
                <MLText variant="bodyL" color="weak" className="mb-4 leading-relaxed">
                  {service.description}
                </MLText>
                
                <ul className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
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
        </motion.div>
      ))}
    </div>
  );
};