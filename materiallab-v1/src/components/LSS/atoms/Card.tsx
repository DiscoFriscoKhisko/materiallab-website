import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = ''
}) => {
  const baseClasses = 'lss-card transition-all duration-300';
  
  const variantClasses = {
    default: 'lss-card-default',
    glass: 'lss-card-glass backdrop-blur-md',
    elevated: 'lss-card-elevated shadow-lg hover:shadow-xl'
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};