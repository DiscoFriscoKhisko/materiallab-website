import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'kn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Translation data
const translations = {
  en: {
    // Hero Section
    hero: {
      title: "Build products people love, fast",
      subtitle: "Research, design, engineering, and AI working together to turn ideas into working businesses.",
      cta: "Book a call"
    },
    // Navigation
    nav: {
      whatWeDo: "What We Do",
      caseStudies: "Case Studies", 
      about: "About",
      bookCall: "Book a Call"
    },
    // What We Do
    whatWeDo: {
      title: "What We Do",
      subtitle: "From concept to launch, we build products that work.",
      discover: {
        title: "Discover",
        description: "Research & validation to confirm your direction and scope essential features."
      },
      design: {
        title: "Design", 
        description: "UX/UI designed for your audience with flows that are efficient and proven."
      },
      build: {
        title: "Build",
        description: "Full-stack development with modern technologies, built to scale."
      },
      aiApplied: {
        title: "AI Applied",
        description: "Intelligent automation and AI features integrated into your product."
      }
    },
    // Founders
    founders: {
      title: "Meet the Founders",
      subtitle: "Hands-on technical founders who've built products from zero to scale.",
      kaushik: {
        name: "Kaushik Naarayan",
        title: "Co-Founder & CTO", 
        bio: "Engineering & AI lead who builds reliable systems and smart automations; ships fast without sacrificing performance or safety."
      },
      damini: {
        name: "Damini Rathi",
        title: "Co-Founder & CEO",
        bio: "Product & UX lead who turns ambiguous ideas into clear, shippable products; blends research depth with friendly, conversion-focused UX."
      }
    },
    // How We Work
    howWeWork: {
      title: "How We Work",
      subtitle: "Our approach is designed for speed, transparency, and results.",
      smallTeams: {
        title: "Small senior teams",
        description: "No juniors, no hand-holding. Direct access to experienced builders."
      },
      weeklyDemos: {
        title: "Weekly demos", 
        description: "See progress every week. Adjust direction based on real results."
      },
      transparentCosts: {
        title: "Transparent costs",
        description: "Fixed scopes, clear timelines. No surprises or scope creep."
      },
      outcomesFirst: {
        title: "Outcomes-first",
        description: "We measure success by your business results, not hours logged."
      }
    },
    // Language Discovery Card
    languageCard: {
      title: "Global reach, local touch",
      subtitle: "Watch your message transform",
      sampleText: "Build products people love",
      discovery: "We build interfaces that speak every language",
      tryText: "Try switching languages:"
    },
    // Final CTA
    finalCta: {
      title: "Ready to build something people love?",
      subtitle: "Let's talk about your project and see how we can help you move fast.",
      cta: "Book a call"
    }
  },
  hi: {
    // Hero Section  
    hero: {
      title: "ऐसे उत्पाद बनाएं जिन्हें लोग पसंद करें, तेज़ी से",
      subtitle: "अनुसंधान, डिज़ाइन, इंजीनियरिंग और AI मिलकर विचारों को काम करने वाले व्यवसायों में बदलते हैं।",
      cta: "कॉल बुक करें"
    },
    // Navigation
    nav: {
      whatWeDo: "हम क्या करते हैं",
      caseStudies: "केस स्टडीज़",
      about: "हमारे बारे में", 
      bookCall: "कॉल बुक करें"
    },
    // What We Do
    whatWeDo: {
      title: "हम क्या करते हैं",
      subtitle: "विचार से लॉन्च तक, हम ऐसे उत्पाद बनाते हैं जो काम करते हैं।",
      discover: {
        title: "खोजें",
        description: "अपनी दिशा की पुष्टि करने और आवश्यक सुविधाओं को निर्धारित करने के लिए अनुसंधान और सत्यापन।"
      },
      design: {
        title: "डिज़ाइन",
        description: "आपके दर्शकों के लिए बनाया गया UX/UI जो कुशल और सिद्ध फ़्लो के साथ है।"
      },
      build: {
        title: "निर्माण", 
        description: "आधुनिक तकनीकों के साथ फुल-स्टैक डेवलपमेंट, स्केल करने के लिए बनाया गया।"
      },
      aiApplied: {
        title: "AI लागू",
        description: "आपके उत्पाद में एकीकृत बुद्धिमान स्वचालन और AI सुविधाएं।"
      }
    },
    // Founders
    founders: {
      title: "संस्थापकों से मिलें",
      subtitle: "हाथों-हाथ तकनीकी संस्थापक जिन्होंने शून्य से स्केल तक उत्पाद बनाए हैं।",
      kaushik: {
        name: "कौशिक नारायण",
        title: "सह-संस्थापक और CTO",
        bio: "इंजीनियरिंग और AI लीड जो विश्वसनीय सिस्टम और स्मार्ट ऑटोमेशन बनाते हैं; प्रदर्शन या सुरक्षा का त्याग किए बिना तेज़ी से शिप करते हैं।"
      },
      damini: {
        name: "दामिनी राठी", 
        title: "सह-संस्थापक और CEO",
        bio: "प्रोडक्ट और UX लीड जो अस्पष्ट विचारों को स्पष्ट, शिप करने योग्य उत्पादों में बदलती हैं; अनुसंधान की गहराई को मैत्रीपूर्ण, रूपांतरण-केंद्रित UX के साथ मिलाती हैं।"
      }
    },
    // How We Work
    howWeWork: {
      title: "हम कैसे काम करते हैं",
      subtitle: "हमारा दृष्टिकोण गति, पारदर्शिता और परिणामों के लिए डिज़ाइन किया गया है।",
      smallTeams: {
        title: "छोटी वरिष्ठ टीमें", 
        description: "कोई जूनियर नहीं, कोई हाथ पकड़ना नहीं। अनुभवी बिल्डरों तक सीधी पहुंच।"
      },
      weeklyDemos: {
        title: "साप्ताहिक डेमो",
        description: "हर सप्ताह प्रगति देखें। वास्तविक परिणामों के आधार पर दिशा समायोजित करें।"
      },
      transparentCosts: {
        title: "पारदर्शी लागतें",
        description: "निश्चित स्कोप, स्पष्ट समयसीमा। कोई आश्चर्य या स्कोप क्रीप नहीं।"
      },
      outcomesFirst: {
        title: "परिणाम-पहले",
        description: "हम आपके व्यावसायिक परिणामों से सफलता मापते हैं, लॉग किए गए घंटों से नहीं।"
      }
    },
    // Language Discovery Card
    languageCard: {
      title: "वैश्विक पहुंच, स्थानीय स्पर्श",
      subtitle: "अपने संदेश को बदलते देखें",
      sampleText: "ऐसे उत्पाद बनाएं जिन्हें लोग पसंद करें",
      discovery: "हम ऐसे इंटरफेस बनाते हैं जो हर भाषा बोलते हैं",
      tryText: "भाषा बदलकर देखें:"
    },
    // Final CTA
    finalCta: {
      title: "कुछ ऐसा बनाने के लिए तैयार हैं जिसे लोग पसंद करें?",
      subtitle: "आइए आपके प्रोजेक्ट के बारे में बात करें और देखें कि हम आपको तेज़ी से आगे बढ़ने में कैसे मदद कर सकते हैं।",
      cta: "कॉल बुक करें"
    }
  },
  kn: {
    // Hero Section
    hero: {
      title: "ಜನರು ಪ್ರೀತಿಸುವ ಉತ್ಪನ್ನಗಳನ್ನು ವೇಗವಾಗಿ ನಿರ್ಮಿಸಿ",
      subtitle: "ಸಂಶೋಧನೆ, ವಿನ್ಯಾಸ, ಇಂಜಿನಿಯರಿಂಗ್ ಮತ್ತು AI ಒಟ್ಟಾಗಿ ಕೆಲಸ ಮಾಡಿ ಕಲ್ಪನೆಗಳನ್ನು ಕೆಲಸ ಮಾಡುವ ವ್ಯವಹಾರಗಳಾಗಿ ಪರಿವರ್ತಿಸಿ.",
      cta: "ಕಾಲ್ ಬುಕ್ ಮಾಡಿ"
    },
    // Navigation
    nav: {
      whatWeDo: "ನಾವು ಏನು ಮಾಡುತ್ತೇವೆ",
      caseStudies: "ಕೇಸ್ ಸ್ಟಡೀಸ್",
      about: "ನಮ್ಮ ಬಗ್ಗೆ",
      bookCall: "ಕಾಲ್ ಬುಕ್ ಮಾಡಿ"
    },
    // What We Do
    whatWeDo: {
      title: "ನಾವು ಏನು ಮಾಡುತ್ತೇವೆ",
      subtitle: "ಪರಿಕಲ್ಪನೆಯಿಂದ ಲಾಂಚ್ ವರೆಗೆ, ನಾವು ಕೆಲಸ ಮಾಡುವ ಉತ್ಪನ್ನಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತೇವೆ.",
      discover: {
        title: "ಅನ್ವೇಷಿಸಿ",
        description: "ನಿಮ್ಮ ದಿಕ್ಕನ್ನು ದೃಢೀಕರಿಸಲು ಮತ್ತು ಅಗತ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ನಿರ್ಧರಿಸಲು ಸಂಶೋಧನೆ ಮತ್ತು ಮೌಲ್ಯೀಕರಣ."
      },
      design: {
        title: "ವಿನ್ಯಾಸ",
        description: "ಪರಿಣಾಮಕಾರಿ ಮತ್ತು ಸಾಧಿತ ಹರಿವುಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಪ್ರೇಕ್ಷಕರಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ UX/UI."
      },
      build: {
        title: "ನಿರ್ಮಾಣ",
        description: "ಆಧುನಿಕ ತಂತ್ರಜ್ಞಾನಗಳೊಂದಿಗೆ ಫುಲ್-ಸ್ಟ್ಯಾಕ್ ಅಭಿವೃದ್ಧಿ, ಸ್ಕೇಲ್ ಮಾಡಲು ನಿರ್ಮಿಸಲಾಗಿದೆ."
      },
      aiApplied: {
        title: "AI ಅನ್ವಯಿಸಲಾಗಿದೆ",
        description: "ನಿಮ್ಮ ಉತ್ಪನ್ನದಲ್ಲಿ ಏಕೀಕೃತವಾದ ಬುದ್ಧಿವಂತ ಸ್ವಯಂಚಾಲನೆ ಮತ್ತು AI ವೈಶಿಷ್ಟ್ಯಗಳು."
      }
    },
    // Founders
    founders: {
      title: "ಸಂಸ್ಥಾಪಕರನ್ನು ಭೇಟಿಯಾಗಿ",
      subtitle: "ಶೂನ್ಯದಿಂದ ಸ್ಕೇಲ್‌ವರೆಗೆ ಉತ್ಪನ್ನಗಳನ್ನು ನಿರ್ಮಿಸಿದ ಪ್ರಾಯೋಗಿಕ ತಾಂತ್ರಿಕ ಸಂಸ್ಥಾಪಕರು.",
      kaushik: {
        name: "ಕೌಶಿಕ್ ನಾರಾಯಣ್",
        title: "ಸಹ-ಸಂಸ್ಥಾಪಕ ಮತ್ತು CTO",
        bio: "ವಿಶ್ವಾಸಾರ್ಹ ವ್ಯವಸ್ಥೆಗಳು ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಆಟೋಮೇಷನ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುವ ಇಂಜಿನಿಯರಿಂಗ್ ಮತ್ತು AI ಲೀಡ್; ಕಾರ್ಯಕ್ಷಮತೆ ಅಥವಾ ಸುರಕ್ಷತೆಯನ್ನು ತ್ಯಾಗ ಮಾಡದೆ ವೇಗವಾಗಿ ಹಡಗು ಮಾಡುತ್ತದೆ."
      },
      damini: {
        name: "ದಾಮಿನಿ ರಾಠಿ",
        title: "ಸಹ-ಸಂಸ್ಥಾಪಕ ಮತ್ತು CEO", 
        bio: "ಅಸ್ಪಷ್ಟ ಕಲ್ಪನೆಗಳನ್ನು ಸ್ಪಷ್ಟ, ಹಡಗು ಮಾಡಬಹುದಾದ ಉತ್ಪನ್ನಗಳಾಗಿ ಪರಿವರ್ತಿಸುವ ಉತ್ಪನ್ನ ಮತ್ತು UX ಲೀಡ್; ಸಂಶೋಧನೆಯ ಆಳವನ್ನು ಸ್ನೇಹಪರ, ಪರಿವರ್ತನೆ-ಕೇಂದ್ರಿತ UX ನೊಂದಿಗೆ ಮಿಶ್ರಣ ಮಾಡುತ್ತದೆ."
      }
    },
    // How We Work
    howWeWork: {
      title: "ನಾವು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತೇವೆ",
      subtitle: "ನಮ್ಮ ವಿಧಾನವು ವೇಗ, ಪಾರದರ್ಶಕತೆ ಮತ್ತು ಫಲಿತಾಂಶಗಳಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
      smallTeams: {
        title: "ಸಣ್ಣ ಹಿರಿಯ ತಂಡಗಳು",
        description: "ಜೂನಿಯರ್‌ಗಳಿಲ್ಲ, ಕೈ ಹಿಡಿಯುವುದಿಲ್ಲ. ಅನುಭವಿ ನಿರ್ಮಾಪಕರಿಗೆ ನೇರ ಪ್ರವೇಶ."
      },
      weeklyDemos: {
        title: "ಸಾಪ್ತಾಹಿಕ ಡೆಮೊಗಳು",
        description: "ಪ್ರತಿ ವಾರ ಪ್ರಗತಿಯನ್ನು ನೋಡಿ. ನೈಜ ಫಲಿತಾಂಶಗಳ ಆಧಾರದ ಮೇಲೆ ದಿಕ್ಕನ್ನು ಸರಿಹೊಂದಿಸಿ."
      },
      transparentCosts: {
        title: "ಪಾರದರ್ಶಕ ವೆಚ್ಚಗಳು",
        description: "ಸ್ಥಿರ ವ್ಯಾಪ್ತಿಗಳು, ಸ್ಪಷ್ಟ ಸಮಯಸೀಮೆಗಳು. ಯಾವುದೇ ಆಶ್ಚರ್ಯಗಳು ಅಥವಾ ವ್ಯಾಪ್ತಿ ಕ್ರೀಪ್ ಇಲ್ಲ."
      },
      outcomesFirst: {
        title: "ಫಲಿತಾಂಶಗಳು-ಮೊದಲು",
        description: "ನಾವು ಲಾಗ್ ಮಾಡಿದ ಗಂಟೆಗಳಿಂದಲ್ಲ, ನಿಮ್ಮ ವ್ಯಾಪಾರದ ಫಲಿತಾಂಶಗಳಿಂದ ಯಶಸ್ಸನ್ನು ಅಳೆಯುತ್ತೇವೆ."
      }
    },
    // Language Discovery Card
    languageCard: {
      title: "ಜಾಗತಿಕ ವ್ಯಾಪ್ತಿ, ಸ್ಥಳೀಯ ಸ್ಪರ್ಶ",
      subtitle: "ನಿಮ್ಮ ಸಂದೇಶವು ಬದಲಾಗುವುದನ್ನು ವೀಕ್ಷಿಸಿ",
      sampleText: "ಜನರು ಪ್ರೀತಿಸುವ ಉತ್ಪನ್ನಗಳನ್ನು ನಿರ್ಮಿಸಿ", 
      discovery: "ನಾವು ಪ್ರತಿ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡುವ ಇಂಟರ್‌ಫೇಸ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತೇವೆ",
      tryText: "ಭಾಷೆಗಳನ್ನು ಬದಲಾಯಿಸಿ ನೋಡಿ:"
    },
    // Final CTA
    finalCta: {
      title: "ಜನರು ಪ್ರೀತಿಸುವ ಯಾವುದನ್ನಾದರೂ ನಿರ್ಮಿಸಲು ಸಿದ್ಧರೇ?",
      subtitle: "ನಿಮ್ಮ ಪ್ರಾಜೆಕ್ಟ್ ಬಗ್ಗೆ ಮಾತನಾಡೋಣ ಮತ್ತು ವೇಗವಾಗಿ ಚಲಿಸಲು ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು ಎಂಬುದನ್ನು ನೋಡೋಣ.",
      cta: "ಕಾಲ್ ಬುಕ್ ಮಾಡಿ"
    }
  }
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('preferred-language') as Language;
    return saved || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
    
    // Update document lang attribute for accessibility
    document.documentElement.lang = lang;
  };

  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return fallback || key;
      }
    }
    
    return typeof value === 'string' ? value : fallback || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};