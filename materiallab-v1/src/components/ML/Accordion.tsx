import { motion, AnimatePresence } from 'framer-motion';
import { useState, type ReactNode, type KeyboardEvent } from 'react';

interface MLAccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

interface MLAccordionProps {
  items: MLAccordionItem[];
  allowMultiple?: boolean;
  defaultOpenItems?: string[];
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
}

export const MLAccordion = ({
  items,
  allowMultiple = false,
  defaultOpenItems = [],
  className = '',
  variant = 'default',
}: MLAccordionProps) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(defaultOpenItems)
  );

  const toggleItem = (itemId: string) => {
    if (!allowMultiple) {
      // Single mode: only one item open at a time
      setOpenItems(prev => 
        prev.has(itemId) ? new Set() : new Set([itemId])
      );
    } else {
      // Multiple mode: toggle individual items
      setOpenItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
        return newSet;
      });
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, itemId: string) => {
    const { key } = event;
    
    if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      toggleItem(itemId);
    }
  };

  const variantClasses = {
    default: 'divide-y divide-outline-variant',
    bordered: 'space-y-2',
    elevated: 'space-y-3',
  };

  const itemClasses = {
    default: '',
    bordered: 'border border-outline-variant rounded-lg overflow-hidden',
    elevated: 'bg-surface-1 border border-outline-variant rounded-lg shadow-elevation-1 overflow-hidden',
  };

  return (
    <div 
      className={`flyout__accordion ${variantClasses[variant]} ${className}`}
      role="region"
      aria-label="Expandable content sections"
    >
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        const isDisabled = item.disabled;

        return (
          <div key={item.id} className={itemClasses[variant]}>
            {/* Accordion Header */}
            <motion.button
              className={`
                flyout__accordion__toggle gdm-text-call-to-action w-full text-left px-4 py-4 lg:px-6 lg:py-5
                flex items-center justify-between gap-4
                transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${isDisabled 
                  ? 'cursor-not-allowed opacity-50' 
                  : 'hover:bg-on-surface/5 focus:bg-on-surface/8 focus:outline-none focus:ring-2 focus:ring-primary/30'
                }
                ${isOpen ? 'open' : ''}
              `.trim()}
              data-title={item.title}
              onClick={() => !isDisabled && toggleItem(item.id)}
              onKeyDown={(e) => !isDisabled && handleKeyDown(e, item.id)}
              disabled={isDisabled}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              id={`accordion-header-${item.id}`}
              whileHover={!isDisabled ? { backgroundColor: 'rgba(var(--on-surface), 0.03)' } : {}}
              whileTap={!isDisabled ? { scale: 0.995 } : {}}
            >
              {/* Title */}
              <span className="font-medium text-on-surface">
                {item.title}
              </span>

              {/* Toggle Icon */}
              <div className="icon flex-shrink-0">
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-on-surface-variant"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2,  }}
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </div>
            </motion.button>

            {/* Accordion Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${item.id}`}
                  className="flyout__accordion__content overflow-hidden"
                  data-section={item.title}
                  role="region"
                  aria-labelledby={`accordion-header-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: 'auto', 
                    opacity: 1,
                    transition: {
                      height: { duration: 0.3,  },
                      opacity: { duration: 0.2, delay: 0.1,  },
                    }
                  }}
                  exit={{ 
                    height: 0, 
                    opacity: 0,
                    transition: {
                      height: { duration: 0.2,  },
                      opacity: { duration: 0.15,  },
                    }
                  }}
                >
                  <motion.div
                    className="px-4 pb-4 lg:px-6 lg:pb-6 text-on-surface-variant"
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3,  }}
                  >
                    {item.content}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};