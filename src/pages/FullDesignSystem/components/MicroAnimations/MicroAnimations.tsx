import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MLText, MLHeading } from '../../../../components/ML';

interface MicroAnimationsProps {
  themeMode: 'light' | 'dark' | 'minimal' | 'maximal';
  isAnimationEnabled: boolean;
}

export const MicroAnimations: React.FC<MicroAnimationsProps> = ({ themeMode, isAnimationEnabled }) => {
  const [activeDemo, setActiveDemo] = useState<string>('loading');
  const [isToggled, setIsToggled] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New message received', type: 'info' },
    { id: 2, text: 'System update complete', type: 'success' },
  ]);

  const animations = [
    { key: 'loading', label: 'Loading States', icon: '⏳', description: 'Skeleton, progress, spinners' },
    { key: 'feedback', label: 'User Feedback', icon: '✨', description: 'Success, error, warning states' },
    { key: 'interactions', label: 'Interactions', icon: '👆', description: 'Hover, click, drag responses' },
    { key: 'transitions', label: 'Page Transitions', icon: '🔄', description: 'Enter, exit, morph effects' },
    { key: 'notifications', label: 'Notifications', icon: '🔔', description: 'Toast, badge, alert animations' },
    { key: 'data', label: 'Data Visualization', icon: '📊', description: 'Chart, graph, counter animations' }
  ];

  const addNotification = () => {
    const messages = [
      'Task completed successfully!',
      'New update available',
      'User joined the workspace',
      'File uploaded successfully'
    ];
    const types = ['success', 'info', 'warning'];
    const newNotification = {
      id: Date.now(),
      text: messages[Math.floor(Math.random() * messages.length)],
      type: types[Math.floor(Math.random() * types.length)]
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 3000);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const renderAnimationDemo = () => {
    switch (activeDemo) {
      case 'loading':
        return (
          <div className="fds-animation-demo">
            <div className="fds-demo-section">
              <h4>Skeleton Loading</h4>
              <div className="fds-skeleton-container">
                <div className="fds-skeleton fds-skeleton-avatar"></div>
                <div className="fds-skeleton-content">
                  <div className="fds-skeleton fds-skeleton-line long"></div>
                  <div className="fds-skeleton fds-skeleton-line medium"></div>
                  <div className="fds-skeleton fds-skeleton-line short"></div>
                </div>
              </div>
            </div>
            
            <div className="fds-demo-section">
              <h4>Progress Indicators</h4>
              <div className="fds-progress-container">
                <div className="fds-progress-bar">
                  <motion.div 
                    className="fds-progress-fill"
                    animate={{ width: ['0%', '75%', '0%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
                <div className="fds-spinner-container">
                  <motion.div
                    className="fds-spinner"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'feedback':
        return (
          <div className="fds-animation-demo">
            <div className="fds-demo-section">
              <h4>Like Animation</h4>
              <motion.button
                className={`fds-like-button ${isLiked ? 'liked' : ''}`}
                onClick={handleLike}
                whileTap={{ scale: 0.9 }}
                animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  className="fds-heart-icon"
                  animate={isLiked ? { 
                    scale: [1, 1.3, 1],
                    rotate: [0, -10, 10, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {isLiked ? '❤️' : '🤍'}
                </motion.span>
                <span className="fds-like-count">{likeCount}</span>
              </motion.button>
            </div>

            <div className="fds-demo-section">
              <h4>Success Feedback</h4>
              <motion.div
                className="fds-success-indicator"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
              >
                <motion.div
                  className="fds-checkmark"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  ✓
                </motion.div>
                <span>Success!</span>
              </motion.div>
            </div>
          </div>
        );

      case 'interactions':
        return (
          <div className="fds-animation-demo">
            <div className="fds-demo-section">
              <h4>Magnetic Button</h4>
              <motion.button
                className="fds-magnetic-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => {}}
                onHoverEnd={() => {}}
              >
                <motion.span
                  whileHover={{ x: 2 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  Hover Me
                </motion.span>
              </motion.button>
            </div>

            <div className="fds-demo-section">
              <h4>Toggle Switch</h4>
              <motion.button
                className={`fds-toggle-switch ${isToggled ? 'active' : ''}`}
                onClick={() => setIsToggled(!isToggled)}
              >
                <motion.div
                  className="fds-toggle-handle"
                  animate={{ x: isToggled ? 20 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          </div>
        );

      case 'transitions':
        return (
          <div className="fds-animation-demo">
            <div className="fds-demo-section">
              <h4>Slide Transitions</h4>
              <AnimatePresence mode="wait">
                <motion.div
                  key={Date.now()}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="fds-transition-card"
                >
                  <h5>Content Card</h5>
                  <p>This demonstrates smooth slide transitions with spring physics.</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="fds-demo-section">
              <h4>Morphing Shape</h4>
              <motion.div
                className="fds-morphing-shape"
                animate={{
                  borderRadius: ['20px', '50%', '20px'],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
              />
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="fds-animation-demo">
            <div className="fds-demo-section">
              <h4>Toast Notifications</h4>
              <button 
                className="fds-demo-trigger"
                onClick={addNotification}
              >
                Trigger Notification
              </button>
              <div className="fds-notifications-container">
                <AnimatePresence>
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      className={`fds-notification ${notification.type}`}
                      initial={{ x: 300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 300, opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                      <span className="fds-notification-icon">
                        {notification.type === 'success' ? '✅' : 
                         notification.type === 'warning' ? '⚠️' : 'ℹ️'}
                      </span>
                      <span className="fds-notification-text">
                        {notification.text}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="fds-animation-demo">
            <div className="fds-demo-section">
              <h4>Animated Counter</h4>
              <motion.div
                className="fds-counter"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span
                  animate={{ 
                    textContent: [0, 1547].map(n => n.toLocaleString())
                  }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                >
                  1,547
                </motion.span>
              </motion.div>
            </div>

            <div className="fds-demo-section">
              <h4>Progress Bars</h4>
              <div className="fds-progress-bars">
                {['Design', 'Development', 'Testing'].map((label, i) => (
                  <div key={label} className="fds-progress-item">
                    <span className="fds-progress-label">{label}</span>
                    <div className="fds-progress-track">
                      <motion.div
                        className="fds-progress-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${(i + 1) * 30}%` }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fds-micro-animations">
      <style>{`
        .fds-micro-animations {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .fds-animations-nav {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .fds-animation-nav-item {
          background: var(--lss-surface);
          border: 2px solid transparent;
          border-radius: 16px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all var(--lss-duration-normal) var(--lss-easing);
          text-align: left;
        }

        .fds-animation-nav-item:hover {
          background: rgba(255, 107, 74, 0.05);
          border-color: rgba(255, 107, 74, 0.2);
          transform: translateY(-2px);
        }

        .fds-animation-nav-item.active {
          border-color: var(--lss-accent);
          background: rgba(255, 107, 74, 0.08);
          transform: translateY(-4px);
        }

        .fds-nav-item-icon {
          font-size: 2rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .fds-nav-item-label {
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 0.25rem;
          display: block;
        }

        .fds-nav-item-description {
          font-size: 0.875rem;
          color: var(--lss-text-secondary);
          line-height: 1.4;
        }

        .fds-animation-demo {
          background: var(--lss-surface);
          border-radius: 20px;
          padding: 3rem;
          border: 1px solid rgba(255, 107, 74, 0.1);
        }

        .fds-demo-section {
          margin-bottom: 3rem;
        }

        .fds-demo-section:last-child {
          margin-bottom: 0;
        }

        .fds-demo-section h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 1.5rem;
          font-family: var(--lss-font-display);
        }

        /* Skeleton Loading Styles */
        .fds-skeleton-container {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .fds-skeleton {
          background: linear-gradient(
            90deg,
            rgba(255, 107, 74, 0.1) 0%,
            rgba(255, 107, 74, 0.2) 50%,
            rgba(255, 107, 74, 0.1) 100%
          );
          background-size: 200% 100%;
          animation: fds-skeleton-loading 2s ease-in-out infinite;
          border-radius: 8px;
        }

        .fds-skeleton-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .fds-skeleton-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .fds-skeleton-line {
          height: 12px;
          border-radius: 6px;
        }

        .fds-skeleton-line.long { width: 100%; }
        .fds-skeleton-line.medium { width: 75%; }
        .fds-skeleton-line.short { width: 50%; }

        @keyframes fds-skeleton-loading {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Progress Indicators */
        .fds-progress-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .fds-progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 107, 74, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .fds-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #FF6B4A, #FFB84D);
          border-radius: 4px;
        }

        .fds-spinner-container {
          display: flex;
          justify-content: center;
        }

        .fds-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 107, 74, 0.2);
          border-top-color: var(--lss-accent);
          border-radius: 50%;
        }

        /* Like Button */
        .fds-like-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--lss-surface);
          border: 2px solid rgba(255, 107, 74, 0.2);
          border-radius: 12px;
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          transition: all var(--lss-duration-fast) var(--lss-easing);
        }

        .fds-like-button:hover {
          border-color: var(--lss-accent);
        }

        .fds-like-button.liked {
          border-color: #e74c3c;
          background: rgba(231, 76, 60, 0.05);
        }

        .fds-heart-icon {
          font-size: 1.25rem;
          display: inline-block;
        }

        .fds-like-count {
          font-weight: 600;
          color: var(--lss-text-primary);
        }

        /* Success Indicator */
        .fds-success-indicator {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(46, 204, 113, 0.1);
          border: 2px solid rgba(46, 204, 113, 0.3);
          border-radius: 12px;
          padding: 1rem 1.5rem;
          color: #27ae60;
          font-weight: 600;
          width: fit-content;
        }

        .fds-checkmark {
          font-size: 1.25rem;
          background: #27ae60;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
        }

        /* Magnetic Button */
        .fds-magnetic-btn {
          background: linear-gradient(135deg, #FF6B4A, #FFB84D);
          border: none;
          border-radius: 12px;
          padding: 1rem 2rem;
          color: white;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        /* Toggle Switch */
        .fds-toggle-switch {
          width: 50px;
          height: 26px;
          background: rgba(255, 107, 74, 0.2);
          border: none;
          border-radius: 13px;
          position: relative;
          cursor: pointer;
          transition: background-color var(--lss-duration-fast) var(--lss-easing);
        }

        .fds-toggle-switch.active {
          background: var(--lss-accent);
        }

        .fds-toggle-handle {
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 3px;
          left: 3px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        /* Transitions */
        .fds-transition-card {
          background: var(--lss-surface);
          border: 1px solid rgba(255, 107, 74, 0.2);
          border-radius: 16px;
          padding: 2rem;
        }

        .fds-transition-card h5 {
          margin: 0 0 1rem 0;
          color: var(--lss-text-primary);
          font-size: 1.125rem;
          font-weight: 600;
        }

        .fds-transition-card p {
          margin: 0;
          color: var(--lss-text-secondary);
          line-height: 1.5;
        }

        .fds-morphing-shape {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #FF6B4A, #B8A4E3);
          margin: 0 auto;
        }

        /* Notifications */
        .fds-demo-trigger {
          background: var(--lss-accent);
          border: none;
          border-radius: 8px;
          padding: 0.75rem 1.5rem;
          color: white;
          cursor: pointer;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .fds-notifications-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .fds-notification {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--lss-surface);
          border: 1px solid;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 0.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 10;
        }

        .fds-notification.success { border-color: #27ae60; }
        .fds-notification.warning { border-color: #f39c12; }
        .fds-notification.info { border-color: #3498db; }

        .fds-notification-icon {
          font-size: 1.125rem;
        }

        .fds-notification-text {
          color: var(--lss-text-primary);
          font-weight: 500;
        }

        /* Data Visualization */
        .fds-counter {
          background: var(--lss-surface);
          border: 2px solid var(--lss-accent);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          font-size: 3rem;
          font-weight: 700;
          color: var(--lss-accent);
          font-family: var(--lss-font-display);
          margin-bottom: 2rem;
        }

        .fds-progress-bars {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .fds-progress-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .fds-progress-label {
          font-weight: 600;
          color: var(--lss-text-primary);
          min-width: 100px;
        }

        .fds-progress-track {
          flex: 1;
          height: 8px;
          background: rgba(255, 107, 74, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .fds-progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #FF6B4A, #FFB84D);
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .fds-animations-nav {
            grid-template-columns: 1fr;
          }
          
          .fds-animation-demo {
            padding: 2rem;
          }
          
          .fds-counter {
            font-size: 2rem;
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="fds-section-header">
        <MLHeading level="2">Micro-animations</MLHeading>
        <MLText>
          Delightful motion design patterns that enhance user experience through meaningful animation
        </MLText>
      </div>

      <nav className="fds-animations-nav">
        {animations.map((animation) => (
          <button
            key={animation.key}
            className={`fds-animation-nav-item ${activeDemo === animation.key ? 'active' : ''}`}
            onClick={() => setActiveDemo(animation.key)}
          >
            <span className="fds-nav-item-icon">{animation.icon}</span>
            <span className="fds-nav-item-label">{animation.label}</span>
            <span className="fds-nav-item-description">{animation.description}</span>
          </button>
        ))}
      </nav>

      <motion.div
        key={activeDemo}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {renderAnimationDemo()}
      </motion.div>
    </div>
  );
};