import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'hero' | 'display-1' | 'display-2' | 'display-3' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-lg' | 'body-sm' | 'caption';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  className = '',
  as: Component = 'p'
}) => {
  const variantClasses = {
    'hero': 'lss-hero-text',
    'display-1': 'lss-display-1',
    'display-2': 'lss-display-2', 
    'display-3': 'lss-display-3',
    'h1': 'lss-h1',
    'h2': 'lss-h2',
    'h3': 'lss-h3',
    'h4': 'lss-h4',
    'h5': 'lss-h5',
    'h6': 'lss-h6',
    'body': 'lss-body',
    'body-lg': 'lss-body-lg',
    'body-sm': 'lss-body-sm',
    'caption': 'lss-caption'
  };

  // Auto-select semantic HTML element based on variant
  if (!Component || Component === 'p') {
    if (variant === 'hero' || variant.startsWith('display') || variant.startsWith('h')) {
      Component = variant.startsWith('h') ? variant as keyof JSX.IntrinsicElements : 'h1';
    }
  }

  return (
    <Component className={`${variantClasses[variant]} ${className}`}>
      {children}
    </Component>
  );
};