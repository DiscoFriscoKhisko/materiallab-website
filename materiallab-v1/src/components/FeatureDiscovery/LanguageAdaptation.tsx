import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Language } from '../../contexts/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const LanguageAdaptation = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [previewLanguage, setPreviewLanguage] = useState<Language>(language);
  const { ref, isInView } = useScrollAnimation({ threshold: 0.3 });

  const languages = [
    { code: 'en' as Language, label: 'English', script: 'EN' },
    { code: 'hi' as Language, label: 'हिन्दी', script: 'हि' },
    { code: 'kn' as Language, label: 'ಕನ್ನಡ', script: 'ಕ' }
  ];

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setPreviewLanguage(lang);
  };

  const getSampleText = (lang: Language) => {
    const sampleTexts = {
      en: "Build products people love",
      hi: "ऐसे उत्पाद बनाएं जिन्हें लोग पसंद करें", 
      kn: "ಜನರು ಪ್ರೀತಿಸುವ ಉತ್ಪನ್ನಗಳನ್ನು ನಿರ್ಮಿಸಿ"
    };
    return sampleTexts[lang];
  };

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-1">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-headline font-primary font-semibold mb-4 text-on-surface">
            {t('languageCard.title')}
          </h3>
          <p className="text-body text-on-surface-variant max-w-2xl mx-auto">
            {t('languageCard.subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Interactive Language Card */}
          <div
            className="glass-card p-8 rounded-2xl text-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Sample Text Display */}
            <div className="mb-8">
              <p className="text-body-s text-on-surface-variant mb-2">
                {t('languageCard.tryText')}
              </p>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={previewLanguage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-title font-primary font-semibold text-on-surface mb-4"
                  style={{
                    fontFamily: previewLanguage === 'en' 
                      ? 'var(--font-primary)'
                      : 'var(--font-primary)'
                  }}
                >
                  {getSampleText(previewLanguage)}
                </motion.div>
              </AnimatePresence>

              <motion.div
                className="flex justify-center items-center gap-2 text-body-s text-on-surface-variant"
                animate={{ opacity: isHovered ? 1 : 0.6 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Click to switch language • Hover to preview</span>
              </motion.div>
            </div>

            {/* Language Selection Buttons */}
            <div className="grid grid-cols-3 gap-4">
              {languages.map((lang, index) => (
                <motion.button
                  key={lang.code}
                  className={`p-4 rounded-lg border transition-all duration-base ${
                    language === lang.code
                      ? 'bg-primary text-on-primary border-primary shadow-elevation-2'
                      : 'bg-surface border-outline-variant text-on-surface hover:bg-surface-2 hover:border-primary'
                  }`}
                  onClick={() => handleLanguageSelect(lang.code)}
                  onMouseEnter={() => setPreviewLanguage(lang.code)}
                  onMouseLeave={() => setPreviewLanguage(language)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <div className="text-title font-mono font-bold mb-2">
                    {lang.script}
                  </div>
                  <div className="text-label font-medium">
                    {lang.label}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Discovery Message */}
            <motion.div
              className="mt-8 pt-6 border-t border-outline-variant"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-body text-on-surface-variant">
                {t('languageCard.discovery')}
              </p>
            </motion.div>
          </div>

          {/* Additional Context */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-body-s text-on-surface-variant">
              Notice how fonts, layout, and reading direction adapt automatically? 
              <br />
              <span className="text-primary font-medium">
                That's the kind of attention to detail we bring to every interface.
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};