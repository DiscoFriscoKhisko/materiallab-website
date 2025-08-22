import { type ReactNode, forwardRef } from 'react';

interface VeoLayoutProps {
  children: ReactNode;
  className?: string;
  wide?: boolean;
  as?: 'div' | 'section' | 'article' | 'main';
}

export const VeoLayout = forwardRef<HTMLElement, VeoLayoutProps>(({
  children,
  className = '',
  wide = false,
  as: Component = 'div'
}, ref) => {
  return (
    <Component 
      ref={ref}
      className={`veo-container ${wide ? 'veo-container-wide' : ''} ${className}`}
    >
      {children}
    </Component>
  );
});

VeoLayout.displayName = 'VeoLayout';

// Section wrapper with proper spacing
interface VeoSectionProps {
  children: ReactNode;
  className?: string;
  background?: 'default' | 'subtle' | 'muted';
  spacing?: 'sm' | 'md' | 'lg';
}

export const VeoSection = ({ 
  children, 
  className = '', 
  background = 'default',
  spacing = 'md'
}: VeoSectionProps) => {
  const bgClasses = {
    default: '',
    subtle: 'bg-surface-1',
    muted: 'bg-surface-2'
  };

  const spacingClasses = {
    sm: 'py-16 md:py-20 lg:py-24',      // 64-96px
    md: 'py-16 md:py-24 lg:py-32',     // 64-128px  
    lg: 'py-20 md:py-32 lg:py-40'      // 80-160px
  };

  return (
    <section className={`veo-section ${bgClasses[background]} ${spacingClasses[spacing]} ${className}`}>
      {children}
    </section>
  );
};

// Grid system components
interface VeoGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const VeoGrid = ({ 
  children, 
  columns = 1, 
  gap = 'md',
  className = '' 
}: VeoGridProps) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-4 md:grid-cols-6 lg:grid-cols-12'
  };

  const gapClasses = {
    sm: 'gap-4',      // 16px
    md: 'gap-6',      // 24px
    lg: 'gap-8',      // 32px
    xl: 'gap-12'      // 48px
  };

  return (
    <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};

// Flexible layout for content blocks
interface VeoFlexProps {
  children: ReactNode;
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
  className?: string;
}

export const VeoFlex = ({ 
  children, 
  direction = 'row',
  align = 'start',
  justify = 'start',
  gap = 'md',
  wrap = false,
  className = '' 
}: VeoFlexProps) => {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'col-reverse': 'flex-col-reverse'
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around'
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  };

  return (
    <div className={`
      flex 
      ${directionClasses[direction]} 
      ${alignClasses[align]} 
      ${justifyClasses[justify]} 
      ${gapClasses[gap]}
      ${wrap ? 'flex-wrap' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

// Content block for alternating layouts
interface VeoContentBlockProps {
  children: ReactNode;
  reverse?: boolean;
  imageRatio?: '1:1' | '4:3' | '16:9' | '3:2';
  className?: string;
}

export const VeoContentBlock = ({ 
  children, 
  reverse = false,
  imageRatio = '16:9',
  className = '' 
}: VeoContentBlockProps) => {
  const ratioClasses = {
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-video',
    '3:2': 'aspect-[3/2]'
  };

  return (
    <div className={`
      grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center
      ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

// Stack for vertical layouts
interface VeoStackProps {
  children: ReactNode;
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align?: 'start' | 'center' | 'end';
  className?: string;
}

export const VeoStack = ({ 
  children, 
  space = 'md',
  align = 'start',
  className = '' 
}: VeoStackProps) => {
  const spaceClasses = {
    xs: 'space-y-2',   // 8px
    sm: 'space-y-4',   // 16px
    md: 'space-y-6',   // 24px
    lg: 'space-y-8',   // 32px
    xl: 'space-y-12',  // 48px
    '2xl': 'space-y-16' // 64px
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end'
  };

  return (
    <div className={`flex flex-col ${spaceClasses[space]} ${alignClasses[align]} ${className}`}>
      {children}
    </div>
  );
};