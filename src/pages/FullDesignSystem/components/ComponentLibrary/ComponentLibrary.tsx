import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MLText, MLHeading } from '../../../../components/ML';

interface ComponentLibraryProps {
  themeMode: 'light' | 'dark' | 'minimal' | 'maximal';
  isAnimationEnabled: boolean;
}

// Enhanced Button Component with Micro-animations
const EnhancedButton: React.FC<{
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}> = ({ variant, size, children, loading, disabled, onClick }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      className={`fds-enhanced-btn fds-enhanced-btn--${variant} fds-enhanced-btn--${size} ${
        disabled ? 'fds-enhanced-btn--disabled' : ''
      }`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ 
        scale: disabled ? 1 : 1.02,
        y: disabled ? 0 : -2
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.98,
        y: disabled ? 0 : 0
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5
      }}
      style={{
        '--ripple-opacity': isPressed ? 0.3 : 0
      } as React.CSSProperties}
    >
      {loading && (
        <motion.div
          className="fds-btn-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      <span className="fds-btn-content">{children}</span>
      <motion.div
        className="fds-btn-ripple"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isPressed ? 1 : 0,
          opacity: isPressed ? 0.3 : 0
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

// Enhanced Card Component with 3D Effects
const EnhancedCard: React.FC<{
  title: string;
  description: string;
  image?: string;
  action?: string;
  elevation?: number;
}> = ({ title, description, image, action, elevation = 1 }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateXValue = (e.clientY - centerY) / 10;
    const rotateYValue = (centerX - e.clientX) / 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={`fds-enhanced-card fds-enhanced-card--elevation-${elevation}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ 
        scale: 1.02,
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {image && (
        <div className="fds-card-image">
          <img src={image} alt={title} />
        </div>
      )}
      <div className="fds-card-content">
        <motion.h3
          className="fds-card-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="fds-card-description"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {description}
        </motion.p>
        {action && (
          <motion.div
            className="fds-card-action"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <EnhancedButton variant="primary" size="sm">
              {action}
            </EnhancedButton>
          </motion.div>
        )}
      </div>
      <motion.div
        className="fds-card-glow"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

// Enhanced Input Component
const EnhancedInput: React.FC<{
  type?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  success?: string;
  loading?: boolean;
}> = ({ type = 'text', placeholder, label, error, success, loading }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <motion.div 
      className="fds-enhanced-input-wrapper"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {label && (
        <motion.label
          className={`fds-enhanced-label ${isFocused || hasValue ? 'fds-enhanced-label--active' : ''}`}
          animate={{
            scale: isFocused || hasValue ? 0.85 : 1,
            y: isFocused || hasValue ? -24 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {label}
        </motion.label>
      )}
      <motion.div className="fds-enhanced-input-container">
        <input
          type={type}
          placeholder={placeholder}
          className={`fds-enhanced-input ${error ? 'fds-enhanced-input--error' : ''} ${
            success ? 'fds-enhanced-input--success' : ''
          }`}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          onChange={(e) => setHasValue(e.target.value.length > 0)}
        />
        {loading && (
          <motion.div
            className="fds-input-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        <motion.div
          className="fds-input-focus-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>
      {error && (
        <motion.div
          className="fds-input-message fds-input-message--error"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.div>
      )}
      {success && (
        <motion.div
          className="fds-input-message fds-input-message--success"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}
        >
          {success}
        </motion.div>
      )}
    </motion.div>
  );
};

// Enhanced Toggle Switch
const EnhancedToggle: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}> = ({ checked, onChange, label, disabled }) => {
  return (
    <motion.label className="fds-enhanced-toggle-wrapper">
      <motion.div
        className={`fds-enhanced-toggle ${checked ? 'fds-enhanced-toggle--checked' : ''} ${
          disabled ? 'fds-enhanced-toggle--disabled' : ''
        }`}
        onClick={() => !disabled && onChange(!checked)}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        animate={{
          backgroundColor: checked 
            ? 'var(--fds-accent)' 
            : disabled 
            ? 'var(--fds-border)'
            : 'var(--fds-text-tertiary)'
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="fds-enhanced-toggle-thumb"
          animate={{
            x: checked ? 24 : 2,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30,
            mass: 0.8
          }}
        />
      </motion.div>
      {label && <span className="fds-toggle-label">{label}</span>}
    </motion.label>
  );
};

export const ComponentLibrary: React.FC<ComponentLibraryProps> = ({ themeMode, isAnimationEnabled }) => {
  const [activeTab, setActiveTab] = useState('buttons');
  const [toggleState, setToggleState] = useState(false);
  const [loadingButton, setLoadingButton] = useState('');

  const tabs = [
    { key: 'buttons', label: 'Buttons', icon: '🔘' },
    { key: 'cards', label: 'Cards', icon: '📋' },
    { key: 'inputs', label: 'Forms', icon: '📝' },
    { key: 'toggles', label: 'Controls', icon: '🎛️' },
  ];

  const handleButtonClick = (type: string) => {
    setLoadingButton(type);
    setTimeout(() => setLoadingButton(''), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };

  return (
    <>
      <style>{`
        /* Enhanced Button Styles */
        .fds-enhanced-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: none;
          border-radius: 12px;
          font-family: var(--fds-font-body);
          font-weight: 600;
          cursor: pointer;
          overflow: hidden;
          transition: all var(--fds-duration-fast) var(--fds-easing-spring);
          box-shadow: var(--fds-shadow-sm);
        }

        .fds-enhanced-btn--sm {
          padding: 8px 16px;
          font-size: 0.875rem;
          min-height: 36px;
        }

        .fds-enhanced-btn--md {
          padding: 12px 24px;
          font-size: 1rem;
          min-height: 44px;
        }

        .fds-enhanced-btn--lg {
          padding: 16px 32px;
          font-size: 1.125rem;
          min-height: 52px;
        }

        .fds-enhanced-btn--primary {
          background: var(--fds-accent);
          color: var(--fds-rich-black);
        }

        .fds-enhanced-btn--secondary {
          background: transparent;
          color: var(--fds-accent);
          border: 2px solid var(--fds-accent);
        }

        .fds-enhanced-btn--ghost {
          background: transparent;
          color: var(--fds-text-secondary);
          border: 1px solid var(--fds-border);
        }

        .fds-enhanced-btn--danger {
          background: #EF4444;
          color: white;
        }

        .fds-enhanced-btn--disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .fds-btn-content {
          position: relative;
          z-index: 2;
        }

        .fds-btn-ripple {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.3);
          border-radius: inherit;
        }

        .fds-btn-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid currentColor;
          border-top: 2px solid transparent;
          border-radius: 50%;
        }

        /* Enhanced Card Styles */
        .fds-enhanced-card {
          background: var(--fds-surface);
          border: 1px solid var(--fds-border);
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          backdrop-filter: blur(20px);
          transition: all var(--fds-duration-normal) var(--fds-easing-spring);
        }

        .fds-enhanced-card--elevation-1 {
          box-shadow: var(--fds-shadow-md);
        }

        .fds-enhanced-card--elevation-2 {
          box-shadow: var(--fds-shadow-lg);
        }

        .fds-enhanced-card--elevation-3 {
          box-shadow: var(--fds-shadow-xl);
        }

        .fds-card-image {
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .fds-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--fds-duration-slow) ease-out;
        }

        .fds-enhanced-card:hover .fds-card-image img {
          transform: scale(1.05);
        }

        .fds-card-content {
          padding: 24px;
          position: relative;
          z-index: 2;
        }

        .fds-card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--fds-text-primary);
          margin-bottom: 12px;
        }

        .fds-card-description {
          color: var(--fds-text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .fds-card-action {
          display: flex;
          justify-content: flex-start;
        }

        .fds-card-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, var(--fds-accent), transparent, var(--fds-accent));
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
        }

        .fds-enhanced-card:hover .fds-card-glow {
          opacity: 0.5 !important;
        }

        /* Enhanced Input Styles */
        .fds-enhanced-input-wrapper {
          position: relative;
          margin-bottom: 24px;
        }

        .fds-enhanced-label {
          position: absolute;
          left: 16px;
          top: 16px;
          color: var(--fds-text-secondary);
          font-size: 1rem;
          pointer-events: none;
          transform-origin: left center;
        }

        .fds-enhanced-label--active {
          color: var(--fds-accent);
          font-weight: 500;
        }

        .fds-enhanced-input-container {
          position: relative;
        }

        .fds-enhanced-input {
          width: 100%;
          padding: 16px;
          border: 2px solid var(--fds-border);
          border-radius: 12px;
          background: var(--fds-surface);
          color: var(--fds-text-primary);
          font-size: 1rem;
          transition: all var(--fds-duration-fast) var(--fds-easing-standard);
          outline: none;
        }

        .fds-enhanced-input:focus {
          border-color: var(--fds-accent);
          box-shadow: 0 0 0 3px rgba(255, 107, 74, 0.1);
        }

        .fds-enhanced-input--error {
          border-color: #EF4444;
        }

        .fds-enhanced-input--success {
          border-color: #10B981;
        }

        .fds-input-focus-line {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--fds-accent);
          transform-origin: center;
        }

        .fds-input-spinner {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          border: 2px solid var(--fds-border);
          border-top: 2px solid var(--fds-accent);
          border-radius: 50%;
        }

        .fds-input-message {
          margin-top: 8px;
          font-size: 0.875rem;
        }

        .fds-input-message--error {
          color: #EF4444;
        }

        .fds-input-message--success {
          color: #10B981;
        }

        /* Enhanced Toggle Styles */
        .fds-enhanced-toggle-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .fds-enhanced-toggle {
          position: relative;
          width: 48px;
          height: 24px;
          border-radius: 12px;
          cursor: pointer;
          transition: all var(--fds-duration-fast) var(--fds-easing-standard);
        }

        .fds-enhanced-toggle--disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .fds-enhanced-toggle-thumb {
          position: absolute;
          top: 2px;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .fds-toggle-label {
          color: var(--fds-text-primary);
          font-weight: 500;
        }

        /* Component Library Layout */
        .component-library-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .component-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          padding: 8px;
          background: var(--fds-surface);
          border-radius: 16px;
          border: 1px solid var(--fds-border);
        }

        .component-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border: none;
          background: transparent;
          border-radius: 12px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--fds-text-secondary);
          transition: all var(--fds-duration-fast) var(--fds-easing-standard);
        }

        .component-tab:hover {
          color: var(--fds-text-primary);
          background: rgba(255, 107, 74, 0.1);
        }

        .component-tab.active {
          color: var(--fds-rich-black);
          background: var(--fds-accent);
        }

        .component-showcase {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .component-demo {
          padding: 2rem;
          background: var(--fds-surface);
          border: 1px solid var(--fds-border);
          border-radius: 20px;
          backdrop-filter: blur(20px);
        }

        .component-demo h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--fds-text-primary);
          margin-bottom: 1.5rem;
        }

        .component-group {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .component-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .component-tabs {
            flex-wrap: wrap;
            justify-content: flex-start;
          }
          
          .component-showcase {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="component-library-header" variants={itemVariants}>
          <MLHeading level="2">Component Library</MLHeading>
          <MLText>Interactive UI components with enhanced micro-animations</MLText>
        </motion.div>

        <motion.div className="component-tabs" variants={itemVariants}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`component-tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </motion.div>

        <motion.div variants={itemVariants}>
          {activeTab === 'buttons' && (
            <div className="component-showcase">
              <div className="component-demo">
                <h4>Primary Buttons</h4>
                <div className="component-group">
                  <EnhancedButton 
                    variant="primary" 
                    size="sm"
                    onClick={() => handleButtonClick('primary-sm')}
                    loading={loadingButton === 'primary-sm'}
                  >
                    Small
                  </EnhancedButton>
                  <EnhancedButton 
                    variant="primary" 
                    size="md"
                    onClick={() => handleButtonClick('primary-md')}
                    loading={loadingButton === 'primary-md'}
                  >
                    Medium
                  </EnhancedButton>
                  <EnhancedButton 
                    variant="primary" 
                    size="lg"
                    onClick={() => handleButtonClick('primary-lg')}
                    loading={loadingButton === 'primary-lg'}
                  >
                    Large
                  </EnhancedButton>
                </div>
              </div>

              <div className="component-demo">
                <h4>Secondary Buttons</h4>
                <div className="component-group">
                  <EnhancedButton variant="secondary" size="md">Secondary</EnhancedButton>
                  <EnhancedButton variant="ghost" size="md">Ghost</EnhancedButton>
                  <EnhancedButton variant="danger" size="md">Danger</EnhancedButton>
                </div>
              </div>

              <div className="component-demo">
                <h4>Button States</h4>
                <div className="component-group">
                  <EnhancedButton variant="primary" size="md" disabled>Disabled</EnhancedButton>
                  <EnhancedButton 
                    variant="primary" 
                    size="md" 
                    loading={loadingButton === 'loading'}
                    onClick={() => handleButtonClick('loading')}
                  >
                    {loadingButton === 'loading' ? 'Loading...' : 'Click to Load'}
                  </EnhancedButton>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cards' && (
            <div className="component-grid">
              <EnhancedCard
                title="Enhanced Card"
                description="This card features 3D tilt effects on hover, smooth animations, and subtle glow effects."
                action="Learn More"
                elevation={1}
              />
              <EnhancedCard
                title="Interactive Design"
                description="Hover over this card to see the magnetic effect in action. The card responds to your mouse movement."
                action="Try It"
                elevation={2}
              />
              <EnhancedCard
                title="Micro-animations"
                description="Every element is carefully animated with spring physics and easing curves for natural motion."
                action="Explore"
                elevation={3}
              />
            </div>
          )}

          {activeTab === 'inputs' && (
            <div className="component-showcase">
              <div className="component-demo">
                <h4>Enhanced Inputs</h4>
                <EnhancedInput
                  label="Your Name"
                  placeholder="Enter your name"
                  type="text"
                />
                <EnhancedInput
                  label="Email Address"
                  placeholder="Enter your email"
                  type="email"
                  success="Valid email format"
                />
                <EnhancedInput
                  label="Password"
                  placeholder="Enter password"
                  type="password"
                  error="Password must be at least 8 characters"
                />
                <EnhancedInput
                  label="Loading State"
                  placeholder="Processing..."
                  loading={true}
                />
              </div>
            </div>
          )}

          {activeTab === 'toggles' && (
            <div className="component-showcase">
              <div className="component-demo">
                <h4>Enhanced Toggles</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <EnhancedToggle
                    checked={toggleState}
                    onChange={setToggleState}
                    label="Enable notifications"
                  />
                  <EnhancedToggle
                    checked={true}
                    onChange={() => {}}
                    label="Always enabled"
                    disabled={true}
                  />
                  <EnhancedToggle
                    checked={false}
                    onChange={() => {}}
                    label="Always disabled"
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};