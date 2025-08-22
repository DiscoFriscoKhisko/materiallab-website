import { motion } from 'framer-motion';
import { MLCard, MLText, MLHeading } from '../ML';

interface AudienceSelectorProps {
  selected: 'smb' | 'creator' | 'ai';
  onChange: (persona: 'smb' | 'creator' | 'ai') => void;
}

export const AudienceSelector = ({ selected, onChange }: AudienceSelectorProps) => {
  const personas = [
    {
      id: 'smb' as const,
      title: 'For Startups & SMBs',
      subtitle: 'MVP → Market → Scale',
      description: 'We help you get from idea to a market-ready MVP, fast.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 'creator' as const,
      title: 'For Creators & Indies',
      subtitle: 'Digital presence + automation',
      description: 'We turn your expertise into a scalable digital product and business.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      )
    },
    {
      id: 'ai' as const,
      title: 'For Teams & Enterprises',
      subtitle: 'Automation that proves ROI',
      description: 'We build tools to automate your most critical workflows.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <MLHeading level={2} className="mb-6">
            What's your ambition?
          </MLHeading>
          <MLText variant="bodyL" color="weak" className="max-w-2xl mx-auto">
            Select your focus to see how we can help.
          </MLText>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <MLCard 
                variant={selected === persona.id ? 'glow-primary' : 'filled'}
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  selected === persona.id 
                    ? 'glow-animate border-primary/30' 
                    : 'hover:border-primary/20'
                }`}
                hover={false}
                onClick={() => onChange(persona.id)}
              >
                <div className="text-center">
                  <motion.div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                      selected === persona.id
                        ? 'bg-primary text-text-inverse shadow-elevation-2'
                        : 'bg-surface-2 text-primary'
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {persona.icon}
                  </motion.div>
                  
                  <MLHeading level={4} className="mb-2">
                    {persona.title}
                  </MLHeading>
                  
                  <MLText 
                    variant="bodyS" 
                    className={`font-medium mb-3 ${
                      selected === persona.id ? 'text-primary' : 'text-ion'
                    }`}
                  >
                    {persona.subtitle}
                  </MLText>
                  
                  <MLText variant="bodyS" color="weak">
                    {persona.description}
                  </MLText>
                </div>

                {/* Selection indicator */}
                {selected === persona.id && (
                  <motion.div
                    className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <svg className="w-4 h-4 text-text-inverse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </MLCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};