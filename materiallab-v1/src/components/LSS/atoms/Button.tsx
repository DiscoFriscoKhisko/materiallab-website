import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = 'ml-transition-normal font-medium focus:outline-none focus:ring-2';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[--ml-brand-sunset-coral] to-[--ml-brand-ion-blue] text-white hover:scale-105 ml-shadow-md hover:ml-shadow-lg',
    secondary: 'border-2 border-[--ml-brand-sunset-coral] text-[--ml-brand-sunset-coral] hover:bg-[--ml-brand-sunset-coral] hover:text-white hover:scale-105',
    minimal: 'text-[--ml-text-primary] hover:bg-[--ml-glass-bg-light]'
  };

  const sizeClasses = {
    sm: 'ml-px-4 ml-py-2 text-[--ml-text-sm] ml-rounded-md',
    md: 'ml-px-6 ml-py-3 text-[--ml-text-base] ml-rounded-lg',
    lg: 'ml-px-8 ml-py-4 text-[--ml-text-lg] ml-rounded-xl'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};