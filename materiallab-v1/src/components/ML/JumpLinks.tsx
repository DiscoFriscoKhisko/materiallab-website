import { motion } from 'framer-motion';
import { useJumpLinks } from '../../hooks/useScrollSpy';
import { type HTMLAttributes } from 'react';

interface MLJumpLinksProps extends HTMLAttributes<HTMLElement> {
  sections: { id: string; label: string }[];
  sticky?: boolean;
  className?: string;
}

export const MLJumpLinks = ({ 
  sections, 
  sticky = true, 
  className = '',
  ...props 
}: MLJumpLinksProps) => {
  const { items, activeId, handleLinkClick, isActive } = useJumpLinks(sections);

  const containerClasses = `
    ${sticky ? 'sticky top-20 z-40' : ''}
    ${className}
  `.trim();

  return (
    <motion.nav
      className={containerClasses}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3,  }}
      aria-label="Jump to section within page"
      {...(props as any)}
    >
      <div className="bg-surface/80 backdrop-blur-md border border-outline-variant/50 rounded-lg shadow-elevation-1 p-2">
        <ul className="flex flex-wrap gap-1" role="list" data-glue-jumplink-label="Jump to section within page">
          {items.map((item, index) => (
            <li key={item.id} className="glue-jumplinks__list-item">
              <motion.a
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`
                  relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]
                  hover:bg-on-surface/8 focus:bg-on-surface/8 focus:outline-none focus:ring-2 focus:ring-primary/30
                  ${isActive(item.id) 
                    ? 'glue-jumplinks__link--active text-primary bg-primary/10' 
                    : 'glue-jumplinks__link text-on-surface-variant hover:text-on-surface'
                  }
                `.trim()}
                aria-label={`${item.label} - Jump to section within page`}
                aria-current={isActive(item.id) ? 'true' : undefined}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1,
                   
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
                
                {/* Active state indicator */}
                {isActive(item.id) && (
                  <motion.div
                    className="absolute -bottom-px left-1/2 h-0.5 bg-primary rounded-full"
                    layoutId="activeJumpLink"
                    initial={{ width: 0, x: '-50%' }}
                    animate={{ width: '80%', x: '-50%' }}
                    transition={{ 
                      duration: 0.2, 
                       
                    }}
                  />
                )}

                {/* Hover state background */}
                <motion.div
                  className="absolute inset-0 bg-on-surface/5 rounded-md opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                />
              </motion.a>
            </li>
          ))}
        </ul>
      </div>

      {/* Progress indicator */}
      {activeId && (
        <motion.div 
          className="absolute left-0 -bottom-2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: '0%' }}
          animate={{ 
            width: `${((items.findIndex(item => item.id === activeId) + 1) / items.length) * 100}%` 
          }}
          transition={{ duration: 0.3,  }}
        />
      )}
    </motion.nav>
  );
};