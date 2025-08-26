import React from 'react';
import { Typography, Button } from '../atoms';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    text: string;
    onClick: () => void;
  };
  secondaryAction?: {
    text: string;
    onClick: () => void;
  };
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  className = ''
}) => {
  return (
    <section className={`lss-hero-section ${className}`}>
      <div className="lss-hero-content">
        <Typography variant="hero" as="h1" className="lss-hero-title">
          {title}
        </Typography>
        
        {subtitle && (
          <Typography variant="display-3" as="h2" className="lss-hero-subtitle">
            {subtitle}
          </Typography>
        )}
        
        {description && (
          <Typography variant="body-lg" className="lss-hero-description">
            {description}
          </Typography>
        )}
        
        {(primaryAction || secondaryAction) && (
          <div className="lss-hero-actions">
            {primaryAction && (
              <Button 
                variant="primary" 
                size="lg"
                onClick={primaryAction.onClick}
              >
                {primaryAction.text}
              </Button>
            )}
            {secondaryAction && (
              <Button 
                variant="secondary" 
                size="lg"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.text}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};