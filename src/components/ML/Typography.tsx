import { motion } from 'framer-motion';
import { type ReactNode, forwardRef } from 'react';
import { kineticWord, wordReveal } from '../../styles/motion';

// Language detection utility
const detectLanguage = (text: string): 'indic' | 'default' => {
  // Check for Devanagari or Kannada characters
  const indicPattern = /[\u0900-\u097F\u0C80-\u0CFF]/;
  return indicPattern.test(text) ? 'indic' : 'default';
};

interface MLTypographyProps {
  children: ReactNode;
  variant?: 'display' | 'headline' | 'title' | 'body' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'bodyL' | 'bodyM' | 'bodyS' | 'caption';
  color?: 'text' | 'weak' | 'weaker' | 'inverse' | 'primary' | 'secondary' | 'tertiary';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
  animate?: 'none' | 'kinetic' | 'reveal' | 'gradient';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  lang?: 'en' | 'hi' | 'kn' | 'auto'; // Language for line-height optimization
}

export const MLText = forwardRef<HTMLElement, MLTypographyProps>(({
  children,
  variant = 'body',
  color = 'text',
  weight = 'normal',
  align = 'left',
  className = '',
  animate = 'none',
  as,
  lang = 'auto',
  ...props
}, ref) => {
  // Auto-detect language if needed
  const detectedLang = lang === 'auto' ? detectLanguage(String(children)) : lang;
  const isIndic = detectedLang === 'hi' || detectedLang === 'kn' || detectedLang === 'indic';
  
  // Determine the HTML element
  const getDefaultElement = (variant: string) => {
    switch (variant) {
      case 'display': return 'h1';
      case 'headline': return 'h2';
      case 'title': return 'h3';
      case 'body': return 'p';
      case 'label': return 'span';
      case 'h1': return 'h1';
      case 'h2': return 'h2';
      case 'h3': return 'h3';
      case 'h4': return 'h4';
      case 'h5': return 'h5';
      default: return 'p';
    }
  };

  const Component = as || getDefaultElement(variant);

  // Get the appropriate font size class based on language
  const getVariantClass = (variant: string) => {
    const baseVariants = {
      // Enhanced role-based variants with Playfair Display for headings
      display: `text-h1 font-display font-weight-display tracking-tight max-line-length`,
      headline: `text-h2 font-display font-weight-heading tracking-tight`,
      title: `text-h3 font-display font-weight-heading`,
      body: isIndic ? `text-body font-body font-weight-body max-line-length` : `text-body font-body font-weight-body max-line-length`,
      label: `text-button font-body font-weight-button tracking-button`,
      
      // Enhanced legacy support with refined typography
      h1: 'text-h1 font-display font-weight-display tracking-tight',
      h2: 'text-h2 font-display font-weight-heading tracking-tight',
      h3: 'text-h3 font-display font-weight-heading',
      h4: 'text-h4 font-display font-weight-heading',
      h5: 'text-h5 font-display font-weight-heading',
      bodyL: isIndic ? 'text-body font-body font-weight-body max-line-length' : 'text-body font-body font-weight-body max-line-length',
      bodyM: isIndic ? 'text-body font-body font-weight-body content-width' : 'text-body font-body font-weight-body content-width',
      bodyS: 'text-small font-body font-weight-body',
      caption: 'text-caption font-body tracking-wide'
    };
    return baseVariants[variant as keyof typeof baseVariants] || baseVariants.body;
  };

  const colorClasses = {
    text: 'text-on-surface',
    weak: 'text-on-surface-variant', 
    weaker: 'text-text-weaker',
    inverse: 'text-on-primary',
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary'
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };

  // Determine if we should override font weight
  const shouldOverrideWeight = ['display', 'headline', 'title', 'label'].includes(variant);
  
  const baseClasses = `
    ${getVariantClass(variant)}
    ${colorClasses[color]}
    ${!shouldOverrideWeight ? weightClasses[weight] : ''}
    ${alignClasses[align]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const animationVariants = {
    kinetic: kineticWord,
    reveal: wordReveal,
    gradient: undefined, // Handled via CSS class
    none: undefined
  };

  if (animate !== 'none') {
    const MotionComponent = motion[Component as keyof typeof motion] as any;
    
    return (
      <MotionComponent
        ref={ref}
        className={baseClasses}
        variants={animationVariants[animate]}
        initial="initial"
        whileInView="animate"
        whileHover={animate === 'kinetic' ? "hover" : undefined}
        viewport={{ once: true }}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }

  const ElementComponent = Component as any;
  return (
    <ElementComponent
      ref={ref}
      className={baseClasses}
      {...props}
    >
      {children}
    </ElementComponent>
  );
});

MLText.displayName = 'MLText';

// Convenience components
export const MLHeading = forwardRef<HTMLElement, Omit<MLTypographyProps, 'variant'> & { level: 1 | 2 | 3 | 4 | 5 }>((props, ref) => {
  const { level, ...rest } = props;
  return <MLText ref={ref} variant={`h${level}` as any} weight="bold" {...rest} />;
});

export const MLBody = forwardRef<HTMLElement, Omit<MLTypographyProps, 'variant'> & { size?: 'large' | 'medium' | 'small' }>((props, ref) => {
  const { size = 'medium', ...rest } = props;
  const variants = { large: 'bodyL', medium: 'bodyM', small: 'bodyS' } as const;
  return <MLText ref={ref} variant={variants[size]} {...rest} />;
});

export const MLCaption = forwardRef<HTMLElement, Omit<MLTypographyProps, 'variant'>>((props, ref) => {
  return <MLText ref={ref} variant="caption" color="weaker" {...props} />;
});

MLHeading.displayName = 'MLHeading';
MLBody.displayName = 'MLBody';  
MLCaption.displayName = 'MLCaption';