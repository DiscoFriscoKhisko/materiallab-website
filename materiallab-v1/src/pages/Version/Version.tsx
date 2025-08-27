import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { VersionNavigation } from './components/VersionNavigation';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { StudioSection } from './components/StudioSection';
import { PlaygroundSection } from './components/PlaygroundSection';
import { JournalSection } from './components/JournalSection';
import { ContactSection } from './components/ContactSection';
import './Version.css';

export const Version: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform scroll progress to control various effects
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.8, 0.3]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={containerRef} className="version-page">
      {/* Dynamic Background Layer */}
      <motion.div 
        className="version-bg-layer"
        style={{
          opacity: backgroundOpacity,
          scale: backgroundScale,
        }}
      >
        <div className="generative-background" />
      </motion.div>

      {/* Navigation */}
      <VersionNavigation />

      {/* Page Sections */}
      <main className="version-main">
        <HeroSection />
        <ServicesSection />
        <StudioSection />
        <PlaygroundSection />
        <JournalSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Version;