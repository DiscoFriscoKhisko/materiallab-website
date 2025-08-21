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
      title: 'Startups & SMBs',
      subtitle: 'MVP → V1 → Scale',
      description: 'Building your first product or scaling an existing one',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 'creator' as const,
      title: 'Creators & Indies',
      subtitle: 'Site/shop + automations',
      description: 'Beautiful digital presence with smart automation',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      )
    },
    {
      id: 'ai' as const,
      title: 'AI Automation',
      subtitle: 'Pilot one workflow',
      description: 'Start with one process, measure ROI, then scale',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
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
            Which describes your situation?
          </MLHeading>
          <MLText variant="bodyL" color="weak" className="max-w-2xl mx-auto">
            Choose your path to see how we can help you build products people love.
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
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  selected === persona.id 
                    ? 'border-coral bg-coral/10 shadow-elevation-2' 
                    : 'hover:border-coral/50 hover:bg-coral/5'
                }`}
                hover={false}
                onClick={() => onChange(persona.id)}
              >
                <div className="text-center">
                  <motion.div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                      selected === persona.id
                        ? 'bg-coral text-text-inverse shadow-elevation-2'
                        : 'bg-surface-2 text-coral'
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
                      selected === persona.id ? 'text-coral' : 'text-ion'
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
                    className="absolute top-4 right-4 w-6 h-6 bg-coral rounded-full flex items-center justify-center"
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