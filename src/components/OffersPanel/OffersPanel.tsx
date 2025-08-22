import { motion, AnimatePresence } from 'framer-motion';
import { MLCard, MLText, MLHeading, MLButton } from '../ML';
import { useNavigate } from 'react-router-dom';

interface OffersPanelProps {
  persona: 'smb' | 'creator' | 'ai';
}

export const OffersPanel = ({ persona }: OffersPanelProps) => {
  const navigate = useNavigate();
  
  const offers = {
    smb: {
      title: 'The MVP Launchpad',
      points: [
        'Go from a validated idea to a paying customer',
        'Scope the essentials, build your core product on a 2-week runway',
        'Weekly demos to keep you in the loop',
        'Market-ready product with analytics and a runbook'
      ],
      cta: 'Start your MVP',
      timeline: '2-8 weeks'
    },
    creator: {
      title: 'The Creator Toolkit',
      points: [
        'Build your digital home with beautiful design',
        'Fast, clean website or shop with checkout',
        'SEO basics to get discovered',
        '1-2 core automations to lighten your operational load'
      ],
      cta: 'Build your presence',
      timeline: '1-4 weeks'
    },
    ai: {
      title: 'The Automation Pilot',
      points: [
        'Target one high-value workflow and prove the ROI',
        'Map your baseline, build a custom tool to automate it',
        'Measure the impact with clear metrics',
        'Create a plan for company-wide rollout'
      ],
      cta: 'Start automation pilot',
      timeline: '4-6 weeks'
    }
  };

  const currentOffer = offers[persona];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={persona}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MLCard 
              variant="glow-primary"
              className="p-8 lg:p-12"
            >
              <div className="text-center mb-8">
                <MLHeading level={2} className="mb-4">
                  {currentOffer.title}
                </MLHeading>
                <MLText variant="bodyL" color="weak" className="mb-6">
                  Typical timeline: {currentOffer.timeline}
                </MLText>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <MLHeading level={4} className="mb-6">
                    What's included:
                  </MLHeading>
                  <ul className="space-y-4">
                    {currentOffer.points.map((point, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <svg 
                          className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <MLText>{point}</MLText>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="text-center">
                  <MLButton
                    variant="filled"
                    size="lg"
                    className="mb-4"
                    onClick={() => navigate('/contact', { state: { projectType: persona } })}
                    iconRight={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    }
                  >
                    {currentOffer.cta}
                  </MLButton>
                  
                  <MLText variant="bodyS" color="weaker">
                    Book a Discovery Call to discuss your specific needs
                  </MLText>
                </div>
              </div>
            </MLCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};