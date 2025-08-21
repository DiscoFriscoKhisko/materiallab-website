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
  const getCardStyles = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'border-blue-200 hover:border-blue-300 hover:shadow-blue-100/50',
      green: 'border-green-200 hover:border-green-300 hover:shadow-green-100/50',
      purple: 'border-purple-200 hover:border-purple-300 hover:shadow-purple-100/50',
      orange: 'border-orange-200 hover:border-orange-300 hover:shadow-orange-100/50',
      indigo: 'border-indigo-200 hover:border-indigo-300 hover:shadow-indigo-100/50',
    };
    return colorMap[color] || colorMap.blue;
  };

  const getIconStyles = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      indigo: 'bg-indigo-100 text-indigo-600',
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="grid gap-6 md:gap-8">
      {services.map((service, index) => (
        <div 
          key={index}
          className={`card p-6 md:p-8 ${getCardStyles(service.color)} transition-all duration-300 hover:shadow-xl`}
        >
          <div className="flex items-start space-x-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconStyles(service.color)}`}>
              <span className="text-2xl">{service.icon}</span>
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-secondary-900 mb-3">
                {service.title}
              </h3>
              <p className="text-secondary-600 mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-3">
                    <svg 
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        variant === 'certain' ? 'text-green-500' : 'text-purple-500'
                      }`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-secondary-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};