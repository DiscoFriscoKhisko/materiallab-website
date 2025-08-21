import { Layout } from '../../components/Layout/Layout';
import { ProofStrip } from '../../components/ProofStrip/ProofStrip';
import { WhatWeDo } from '../../components/WhatWeDo/WhatWeDo';
import { AudienceSelector } from '../../components/AudienceSelector/AudienceSelector';
import { OffersPanel } from '../../components/OffersPanel/OffersPanel';
import { MediaPlaceholder } from '../../components/MediaPlaceholder/MediaPlaceholder';
import { LabBlocksAssembly } from '../../components/LabBlocks/LabBlocks';
import { TuningKnobsAssembly } from '../../components/TuningKnobs/TuningKnobs';
import { HeroVideoSystem } from '../../components/Hero3D/Hero3D';
import { LanguageAdaptation } from '../../components/FeatureDiscovery/LanguageAdaptation';
import { motion } from 'framer-motion';
import { MLHeading, MLText, MLButton } from '../../components/ML';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation, useStaggeredAnimation } from '../../hooks/useScrollAnimation';
import { useLanguage } from '../../contexts/LanguageContext';
import { useState } from 'react';

export const Landing = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedPersona, setSelectedPersona] = useState<'smb' | 'creator' | 'ai'>('smb');
  const heroRef = useScrollAnimation({ threshold: 0.2 });
  const foundersRef = useScrollAnimation({ threshold: 0.3 });
  const workPrinciplesRef = useStaggeredAnimation(4, 0.15);
  
  return (
    <Layout>
      <div className="relative overflow-hidden bg-background">
        {/* Hero Section */}
        <section ref={heroRef.ref} className="relative py-24 lg:py-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <MLText variant="display" as="h1" className="mb-6 heading-spacing-tight">
                {t('hero.title')}
              </MLText>
              
              <MLText variant="body" color="weak" className="mb-12 max-line-length mx-auto paragraph-spacing">
                {t('hero.subtitle')}
              </MLText>

              {/* Hero Video System */}
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={heroRef.isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <HeroVideoSystem className="max-w-4xl mx-auto" />
              </motion.div>

              {/* Visual Metaphors Row */}
              <div className="mb-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <motion.div 
                  className="flex justify-center"
                  initial={{ opacity: 0, x: -30 }}
                  animate={heroRef.isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <LabBlocksAssembly className="max-w-md" />
                </motion.div>
                <motion.div 
                  className="flex justify-center"
                  initial={{ opacity: 0, x: 30 }}
                  animate={heroRef.isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <TuningKnobsAssembly className="max-w-md" />
                </motion.div>
              </div>

              <MLButton
                variant="filled"
                size="lg"
                onClick={() => navigate('/contact')}
                iconRight={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                {t('hero.cta')}
              </MLButton>
            </motion.div>
          </div>
          
          {/* Light Theme Background decoration */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute bottom-20 right-1/4 w-48 h-48 bg-gradient-to-r from-tertiary/5 to-primary/5 rounded-full blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], rotate: [360, 0, 360] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </section>

        {/* Proof Strip */}
        <ProofStrip />

        {/* What We Do */}
        <WhatWeDo />

        {/* Language Adaptation Discovery Card */}
        <LanguageAdaptation />

        {/* Audience Selector */}
        <AudienceSelector 
          selected={selectedPersona} 
          onChange={setSelectedPersona} 
        />

        {/* Offers Panel */}
        <OffersPanel persona={selectedPersona} />

        {/* Founders Section */}
        <section ref={foundersRef.ref} className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={foundersRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <MLText variant="headline" as="h3" className="mb-4 heading-spacing-tight">
                {t('founders.title')}
              </MLText>
              <MLText variant="body" color="weak" className="max-line-length mx-auto">
                {t('founders.subtitle')}
              </MLText>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: t('founders.kaushik.name'),
                  title: t('founders.kaushik.title'),
                  bio: t('founders.kaushik.bio'),
                  placeholder: 'Founder photo + LinkedIn'
                },
                {
                  name: t('founders.damini.name'),
                  title: t('founders.damini.title'),
                  bio: t('founders.damini.bio'),
                  placeholder: 'Founder photo + LinkedIn'
                }
              ].map((founder, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="mb-4">
                    <MediaPlaceholder
                      type="image"
                      title={founder.name}
                      description={founder.placeholder}
                      aspectRatio="square"
                      className="max-w-32 mx-auto"
                    />
                  </div>
                  <MLHeading level={5} className="mb-1">
                    {founder.name}
                  </MLHeading>
                  <MLText variant="bodyS" className="mb-3 font-medium text-primary">
                    {founder.title}
                  </MLText>
                  <MLText variant="bodyS" color="weak" className="mb-4">
                    {founder.bio}
                  </MLText>
                  <MLButton
                    variant="text"
                    size="sm"
                    iconLeft={
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    }
                  >
                    LinkedIn
                  </MLButton>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section ref={workPrinciplesRef.ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-1">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={workPrinciplesRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <MLHeading level={3} className="mb-4">
                {t('howWeWork.title')}
              </MLHeading>
              <MLText variant="bodyL" color="weak">
                {t('howWeWork.subtitle')}
              </MLText>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: t('howWeWork.smallTeams.title'),
                  description: t('howWeWork.smallTeams.description'),
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )
                },
                {
                  title: t('howWeWork.weeklyDemos.title'),
                  description: t('howWeWork.weeklyDemos.description'),
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )
                },
                {
                  title: t('howWeWork.transparentCosts.title'),
                  description: t('howWeWork.transparentCosts.description'),
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                {
                  title: t('howWeWork.outcomesFirst.title'),
                  description: t('howWeWork.outcomesFirst.description'),
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  )
                }
              ].map((principle, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1 }
                  }}
                  {...workPrinciplesRef.getItemProps(index)}
                  transition={{ 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                >
                  <div className="w-12 h-12 bg-coral/20 rounded-lg flex items-center justify-center mx-auto mb-4 text-coral">
                    {principle.icon}
                  </div>
                  <MLHeading level={5} className="mb-3">
                    {principle.title}
                  </MLHeading>
                  <MLText variant="bodyS" color="weak">
                    {principle.description}
                  </MLText>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Elements Placeholder */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8">
              <MediaPlaceholder
                type="carousel"
                title="Client Testimonials"
                description="Rotating testimonials from satisfied clients (3-4 testimonials). Include client photos, quotes highlighting results, and company details."
                specs="Auto-rotating carousel with manual controls, smooth transitions"
                aspectRatio="wide"
              />
              
              <MediaPlaceholder
                type="image"
                title="Client Logos Bar"
                description="Thin horizontal strip of client company logos in grayscale. Provides social proof and credibility."
                specs="Responsive grid/strip, subtle hover effects"
                aspectRatio="wide"
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <MLHeading level={3} className="mb-6">
              {t('finalCta.title')}
            </MLHeading>
            <MLText variant="bodyL" color="weak" className="mb-8">
              {t('finalCta.subtitle')}
            </MLText>
            <MLButton
              variant="filled"
              size="lg"
              onClick={() => navigate('/contact')}
              iconRight={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              }
            >
              {t('finalCta.cta')}
            </MLButton>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};