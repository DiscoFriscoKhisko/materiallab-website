import { motion } from 'framer-motion';
import { type ReactNode, forwardRef } from 'react';

interface TypographyProps {
  children: ReactNode;
  variant?: 'hero' | 'display1' | 'display2' | 'display3' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'bodyXL' | 'bodyL' | 'body' | 'bodyS' | 'bodyXS' | 'captionL' | 'caption' | 'captionS' | 'code' | 'button' | 'link';
  color?: 'text' | 'weak' | 'weaker' | 'inverse' | 'primary' | 'secondary';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  brandVoice?: 'thoughtful-expert' | 'compelling-presenter' | 'auto';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'code';
}

export const MLText = forwardRef<HTMLElement, TypographyProps>(({
  children,
  variant = 'body',
  color = 'text',
  weight = 'normal',
  align = 'left',
  brandVoice = 'auto',
  className = '',
  as,
  ...props
}, ref) => {
  
  // Determine the HTML element
  const Element = as || (() => {
    switch (variant) {
      case 'hero': return 'h1';
      case 'display1': return 'h1';
      case 'display2': return 'h1';
      case 'display3': return 'h2';
      case 'h1': return 'h1';
      case 'h2': return 'h2';
      case 'h3': return 'h3';
      case 'h4': return 'h4';
      case 'h5': return 'h5';
      case 'h6': return 'h6';
      case 'code': return 'code';
      case 'button': return 'span';
      case 'link': return 'a';
      default: return 'p';
    }
  })();

  // V2 Typography System Classes - Uses ml-typo- prefix
  const sizeClasses = {
    hero: 'ml-typo-hero',
    display1: 'ml-typo-display-1',
    display2: 'ml-typo-display-2',
    display3: 'ml-typo-display-3',
    h1: 'ml-typo-h1',
    h2: 'ml-typo-h2',
    h3: 'ml-typo-h3',
    h4: 'ml-typo-h4',
    h5: 'ml-typo-h5',
    h6: 'ml-typo-h6',
    bodyXL: 'ml-typo-body-xl',
    bodyL: 'ml-typo-body-lg',
    body: 'ml-typo-body',
    bodyS: 'ml-typo-body-sm',
    bodyXS: 'ml-typo-body-xs',
    captionL: 'ml-typo-caption-lg',
    caption: 'ml-typo-caption',
    captionS: 'ml-typo-caption-sm',
    code: 'ml-typo-code',
    button: 'ml-typo-button',
    link: 'ml-typo-link'
  };

  // Color mapping
  const colorClasses = {
    text: 'text-text',
    weak: 'text-text-weak',
    weaker: 'text-text-weaker',
    inverse: 'text-text-inverse',
    primary: 'text-primary',
    secondary: 'text-secondary'
  };

  // Weight mapping (override if needed)
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  // Alignment mapping
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  // Brand voice classes (V2 feature)
  const brandVoiceClasses = {
    'thoughtful-expert': 'typo-thoughtful-expert',
    'compelling-presenter': 'typo-compelling-presenter',
    'auto': '' // Auto-determined by typography class
  };

  // Build classes - V2 typography classes include font, size, weight, line-height, letter-spacing
  const classes = [
    sizeClasses[variant], // Main typography class (includes most styling)
    colorClasses[color], // Text color
    alignClasses[align], // Text alignment
    brandVoiceClasses[brandVoice], // Brand voice override
    // Weight override only if different from typography class default
    weight !== 'normal' ? weightClasses[weight] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Element
      ref={ref as any}
      className={classes}
      {...props}
    >
      {children}
    </Element>
  );
});

// Heading component
interface HeadingProps extends Omit<TypographyProps, 'variant'> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  display?: boolean; // Use display variants for hero/large headings
}

export const MLHeading = forwardRef<HTMLElement, HeadingProps>(({
  level,
  display = false,
  ...props
}, ref) => {
  // Choose variant based on level and display flag
  let variant: TypographyProps['variant'];
  if (display) {
    // Use display variants for compelling presenter moments
    switch (level) {
      case 1: variant = 'hero'; break;
      case 2: variant = 'display1'; break;
      case 3: variant = 'display2'; break;
      case 4: variant = 'display3'; break;
      default: variant = 'h1';
    }
  } else {
    // Use standard heading variants
    variant = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  }
  
  return <MLText ref={ref} variant={variant} {...props} />;
});

// Convenience components
export const MLHero = forwardRef<HTMLElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <MLText ref={ref} variant="hero" {...props} />
);

export const MLDisplay = forwardRef<HTMLElement, Omit<TypographyProps, 'variant'> & { size?: 1 | 2 | 3 }>(
  ({ size = 1, ...props }, ref) => {
    const variant = `display${size}` as 'display1' | 'display2' | 'display3';
    return <MLText ref={ref} variant={variant} {...props} />;
  }
);

export const MLBody = forwardRef<HTMLElement, Omit<TypographyProps, 'variant'> & { size?: 'XL' | 'L' | 'base' | 'S' | 'XS' }>(
  ({ size = 'base', ...props }, ref) => {
    const sizeMap = {
      'XL': 'bodyXL',
      'L': 'bodyL', 
      'base': 'body',
      'S': 'bodyS',
      'XS': 'bodyXS'
    } as const;
    return <MLText ref={ref} variant={sizeMap[size]} {...props} />;
  }
);

export const MLCaption = forwardRef<HTMLElement, Omit<TypographyProps, 'variant'> & { size?: 'L' | 'base' | 'S' }>(
  ({ size = 'base', ...props }, ref) => {
    const sizeMap = {
      'L': 'captionL',
      'base': 'caption',
      'S': 'captionS'
    } as const;
    return <MLText ref={ref} variant={sizeMap[size]} {...props} />;
  }
);

export const MLCode = forwardRef<HTMLElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <MLText ref={ref} variant="code" as="code" {...props} />
);

export const MLButton = forwardRef<HTMLElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <MLText ref={ref} variant="button" {...props} />
);

export const MLLink = forwardRef<HTMLElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <MLText ref={ref} variant="link" as="a" {...props} />
);

// Display names
MLText.displayName = 'MLText';
MLHeading.displayName = 'MLHeading';
MLHero.displayName = 'MLHero';
MLDisplay.displayName = 'MLDisplay';
MLBody.displayName = 'MLBody';
MLCaption.displayName = 'MLCaption';
MLCode.displayName = 'MLCode';
MLButton.displayName = 'MLButton';
MLLink.displayName = 'MLLink';