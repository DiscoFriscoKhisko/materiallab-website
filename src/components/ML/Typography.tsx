import { motion } from 'framer-motion';
import { type ReactNode, forwardRef } from 'react';

interface TypographyProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'bodyL' | 'bodyS' | 'caption';
  color?: 'text' | 'weak' | 'weaker' | 'inverse' | 'primary' | 'secondary';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export const MLText = forwardRef<HTMLElement, TypographyProps>(({
  children,
  variant = 'body',
  color = 'text',
  weight = 'normal',
  align = 'left',
  className = '',
  as,
  ...props
}, ref) => {
  
  // Determine the HTML element
  const Element = as || (() => {
    switch (variant) {
      case 'h1': return 'h1';
      case 'h2': return 'h2';
      case 'h3': return 'h3';
      case 'h4': return 'h4';
      case 'h5': return 'h5';
      default: return 'p';
    }
  })();

  // Font size and line height mapping
  const sizeClasses = {
    h1: 'text-5xl leading-tight font-display',
    h2: 'text-4xl leading-tight font-display',
    h3: 'text-2xl leading-snug font-display',
    h4: 'text-xl leading-snug font-display',
    h5: 'text-lg leading-normal font-display',
    body: 'text-base leading-relaxed',
    bodyL: 'text-lg leading-relaxed',
    bodyS: 'text-sm leading-normal',
    caption: 'text-xs leading-normal'
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

  // Weight mapping
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

  const classes = `
    ${sizeClasses[variant]}
    ${colorClasses[color]}
    ${weightClasses[weight]}
    ${alignClasses[align]}
    ${className}
  `.trim();

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
  level: 1 | 2 | 3 | 4 | 5;
}

export const MLHeading = forwardRef<HTMLElement, HeadingProps>(({
  level,
  ...props
}, ref) => {
  const variant = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  return <MLText ref={ref} variant={variant} {...props} />;
});

// Convenience components
export const MLBody = forwardRef<HTMLElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <MLText ref={ref} variant="body" {...props} />
);

export const MLCaption = forwardRef<HTMLElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <MLText ref={ref} variant="caption" {...props} />
);

// Display names
MLText.displayName = 'MLText';
MLHeading.displayName = 'MLHeading';
MLBody.displayName = 'MLBody';
MLCaption.displayName = 'MLCaption';