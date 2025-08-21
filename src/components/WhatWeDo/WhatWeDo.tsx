import { motion } from 'framer-motion';
import { MLCard, MLText, MLHeading } from '../ML';
import { useLanguage } from '../../contexts/LanguageContext';

export const WhatWeDo = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      title: t('whatWeDo.discover.title'),
      description: t('whatWeDo.discover.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      color: 'from-coral/20 to-coral/40',
      iconColor: 'text-coral'
    },
    {
      title: t('whatWeDo.design.title'),
      description: t('whatWeDo.design.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 5l3 3-3 3" />
        </svg>
      ),
      color: 'from-ion/20 to-ion/40',
      iconColor: 'text-ion'
    },
    {
      title: t('whatWeDo.build.title'),
      description: t('whatWeDo.build.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      color: 'from-success/20 to-success/40',
      iconColor: 'text-success'
    },
    {
      title: t('whatWeDo.aiApplied.title'),
      description: t('whatWeDo.aiApplied.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: 'from-coral/20 to-ion/40',
      iconColor: 'text-ion'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <MLHeading level={2} className="mb-6">
            {t('whatWeDo.title')}
          </MLHeading>
          <MLText variant="bodyL" color="weak" className="max-w-3xl mx-auto">
            {t('whatWeDo.subtitle')}
          </MLText>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <MLCard 
                className="p-6 text-center h-full glass-card" 
                hover={true}
                variant="elevated"
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mx-auto mb-4 shadow-elevation-1`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className={service.iconColor}>
                    {service.icon}
                  </div>
                </motion.div>
                
                <MLHeading level={4} className="mb-3">
                  {service.title}
                </MLHeading>
                
                <MLText variant="bodyS" color="weak">
                  {service.description}
                </MLText>
              </MLCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};