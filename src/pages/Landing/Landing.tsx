import { Layout } from '../../components/Layout/Layout';
import { MLSectionTitle, MLText, MLHeading } from '../../components/ML';
import { VeoButton, VeoArrowIcon } from '../../components/VeoButton';
import { ContactSplit } from '../../components/ContactCTA';
import { TestimonialCarousel } from '../../components/TestimonialCarousel';
import { VideoHero } from '../../components/VideoHero/VideoHero';
import { HeroVideoSystem } from '../../components/Hero3D/Hero3D';
import { ProofStrip } from '../../components/ProofStrip/ProofStrip';
import { AudienceSelector } from '../../components/AudienceSelector/AudienceSelector';
import { OffersPanel } from '../../components/OffersPanel/OffersPanel';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useState } from 'react';

export const Landing = () => {
  const navigate = useNavigate();
  const servicesRef = useScrollAnimation({ threshold: 0.3 });
  const testimonialsRef = useScrollAnimation({ threshold: 0.3 });
  const [selectedPersona, setSelectedPersona] = useState<'smb' | 'creator' | 'ai'>('smb');
  
  // Client testimonials data
  const testimonials = [
    {
      id: 'wellness-ceo',
      quote: 'Game changer. We went from drowning in admin work to focusing on what we do best - creating great products.',
      author: 'Sarah Chen',
      role: 'CEO',
      company: 'Wellness Brand',
      rating: 5,
    },
    {
      id: 'tech-head',
      quote: 'The pilot was so successful, we immediately expanded it company-wide. ROI was clear from week 2.',
      author: 'Michael Rodriguez',
      role: 'Head of People',
      company: 'Tech Company',
      rating: 5,
    },
    {
      id: 'creator-founder',
      quote: 'MaterialLab helped us launch our MVP in 3 weeks. Now we\'re processing $50K+ monthly with the same small team.',
      author: 'Emma Thompson',
      role: 'Founder',
      company: 'Creative Studio',
      rating: 5,
    },
    {
      id: 'startup-cto',
      quote: 'The automation they built saves us 15 hours weekly. Our team can finally focus on product innovation.',
      author: 'Alex Kim',
      role: 'CTO',
      company: 'FinTech Startup',
      rating: 5,
    },
  ];
  
  return (
    <Layout>
      <div className="relative overflow-hidden bg-background">
        {/* Video Hero Section */}
        <VideoHero />
        
        {/* Secondary Hero Video System - Edge to Edge */}
        <section className="scene-module">
          <motion.div 
            className="mb-12 -mx-6 sm:-mx-12 lg:-mx-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <HeroVideoSystem className="w-full" />
          </motion.div>
        </section>

        {/* Proof Strip */}
        <ProofStrip />

        {/* What We Do Section */}
        <section ref={servicesRef.ref} className="scene-module bg-surface/30">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={servicesRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <MLSectionTitle
                variant="headline"
                align="center"
                animate={true}
                subtitle="Select your focus to see how we can help."
                className="mb-8"
              >
                A dedicated partner for every ambition.
              </MLSectionTitle>
            </motion.div>

            <AudienceSelector 
              selected={selectedPersona}
              onChange={setSelectedPersona}
            />
          </div>
        </section>

        {/* Offers Panel */}
        <OffersPanel persona={selectedPersona} />

        {/* Client Testimonials */}
        <section ref={testimonialsRef.ref} className="scene-module">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={testimonialsRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <MLSectionTitle
                variant="headline"
                align="center"
                animate={true}
                subtitle="Hear from companies who've built successful products with MaterialLab"
                className="mb-8"
              >
                Trusted by teams worldwide
              </MLSectionTitle>
            </motion.div>

            <TestimonialCarousel 
              testimonials={testimonials}
              autoRotate={true}
              autoRotateInterval={6000}
            />
          </div>
        </section>

        {/* Final CTA */}
        <section className="scene-module bg-surface-1">
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <MLHeading level={2} className="mb-6">
              Let's shape what you're building.
            </MLHeading>
            <MLText variant="bodyL" color="weak" className="mb-8 max-line-length mx-auto">
              Your next step is a no-obligation call to see if we're the right partner to bring your vision to life.
            </MLText>
            <VeoButton
              variant="primary"
              size="lg"
              onClick={() => navigate('/contact')}
              icon={<VeoArrowIcon />}
              iconPosition="right"
            >
              Book a Discovery Call
            </VeoButton>
          </div>
        </section>

        {/* Contact Journey */}
        <ContactSplit
          whatsappNumber="+14155551234"
          onFormSubmit={(data) => {
            console.log('Form submitted:', data);
          }}
          className="bg-surface/30"
        />
      </div>
    </Layout>
  );
};