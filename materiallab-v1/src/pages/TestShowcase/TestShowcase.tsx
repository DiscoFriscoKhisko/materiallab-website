import { Layout } from '../../components/Layout/Layout';
import { MLSectionTitle, MLText } from '../../components/ML';
import { VeoButton } from '../../components/VeoButton';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const TestShowcase = () => {
  const [focusState, setFocusState] = useState<string>('');

  return (
    <Layout>
      <div className="relative overflow-hidden bg-background py-veo-8">
        {/* Header */}
        <section className="scene-module">
          <div className="max-w-6xl mx-auto px-veo-6">
            <MLText variant="display" as="h1" className="mb-veo-6 text-center">
              Design System Test Showcase
            </MLText>
            <MLText variant="body" color="weak" className="mb-veo-8 text-center max-w-3xl mx-auto">
              Visual verification of all ML design system components, interactions, and accessibility features.
            </MLText>
          </div>
        </section>

        {/* Color Palette Testing */}
        <section className="scene-module bg-surface/30">
          <div className="max-w-6xl mx-auto px-veo-6">
            <MLSectionTitle variant="headline" className="mb-veo-6">
              Color Palette & Variables
            </MLSectionTitle>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-veo-6 mb-veo-8">
              <div className="space-y-veo-3">
                <div className="h-veo-12 rounded-veo-lg" style={{ backgroundColor: 'var(--ml-primary)' }} />
                <div className="text-center">
                  <MLText variant="bodyS" className="font-mono">--ml-primary</MLText>
                  <MLText variant="caption" color="weak">#6366F1</MLText>
                </div>
              </div>
              
              <div className="space-y-veo-3">
                <div className="h-veo-12 rounded-veo-lg" style={{ backgroundColor: 'var(--ml-veo-blue)' }} />
                <div className="text-center">
                  <MLText variant="bodyS" className="font-mono">--ml-veo-blue</MLText>
                  <MLText variant="caption" color="weak">#4A90E2</MLText>
                </div>
              </div>
              
              <div className="space-y-veo-3">
                <div className="h-veo-12 rounded-veo-lg" style={{ backgroundColor: 'var(--ml-mist-cyan)' }} />
                <div className="text-center">
                  <MLText variant="bodyS" className="font-mono">--ml-mist-cyan</MLText>
                  <MLText variant="caption" color="weak">#7FE3D7</MLText>
                </div>
              </div>
              
              <div className="space-y-veo-3">
                <div className="h-veo-12 rounded-veo-lg" style={{ backgroundColor: 'var(--ml-iris-indigo)' }} />
                <div className="text-center">
                  <MLText variant="bodyS" className="font-mono">--ml-iris-indigo</MLText>
                  <MLText variant="caption" color="weak">#6B6CF3</MLText>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Button Testing */}
        <section className="scene-module">
          <div className="max-w-6xl mx-auto px-veo-6">
            <MLSectionTitle variant="headline" className="mb-veo-6">
              Button Components & States
            </MLSectionTitle>
            
            <div className="space-y-veo-6">
              {/* ML Buttons */}
              <div className="space-y-veo-4">
                <MLText variant="title" className="mb-veo-4">ML Design System Buttons</MLText>
                <div className="flex flex-wrap gap-veo-4">
                  <VeoButton 
                    variant="primary" 
                    size="lg" 
                    className="ml-btn-primary"
                    onFocus={() => setFocusState('ml-primary-lg')}
                    onBlur={() => setFocusState('')}
                  >
                    Primary Large
                  </VeoButton>
                  
                  <VeoButton 
                    variant="primary" 
                    size="md" 
                    className="ml-btn-primary"
                    onFocus={() => setFocusState('ml-primary-md')}
                    onBlur={() => setFocusState('')}
                  >
                    Primary Medium
                  </VeoButton>
                  
                  <VeoButton 
                    variant="outline" 
                    size="lg" 
                    className="ml-btn-secondary"
                    onFocus={() => setFocusState('ml-secondary')}
                    onBlur={() => setFocusState('')}
                  >
                    Secondary
                  </VeoButton>
                  
                  <VeoButton 
                    variant="primary" 
                    size="lg" 
                    className="ml-btn-primary"
                    disabled
                  >
                    Disabled
                  </VeoButton>
                </div>
                {focusState && (
                  <MLText variant="caption" color="weak">
                    Focus state active: {focusState}
                  </MLText>
                )}
              </div>

              {/* Standard Buttons for comparison */}
              <div className="space-y-veo-4">
                <MLText variant="title" className="mb-veo-4">Standard Buttons (Original)</MLText>
                <div className="flex flex-wrap gap-veo-4">
                  <VeoButton variant="primary" size="lg">Standard Filled</VeoButton>
                  <VeoButton variant="outline" size="lg">Standard Outlined</VeoButton>
                  <VeoButton variant="ghost" size="lg">Standard Text</VeoButton>
                  <VeoButton variant="secondary" size="lg">Standard Tonal</VeoButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Links & Text Effects */}
        <section className="scene-module bg-surface/30">
          <div className="max-w-6xl mx-auto px-veo-6">
            <MLSectionTitle variant="headline" className="mb-veo-6">
              Links & Text Effects
            </MLSectionTitle>
            
            <div className="space-y-veo-6">
              <div>
                <MLText variant="title" className="mb-veo-4">Gradient Underline Links</MLText>
                <div className="space-y-veo-2">
                  <p>
                    <a href="#" className="ml-link">Standard gradient link with shimmer on hover</a>
                  </p>
                  <p>
                    <a href="#" className="ml-link">Another link to test consistency</a>
                  </p>
                  <p>
                    Visit our <a href="#" className="ml-link">what we do</a> page or learn about our{' '}
                    <a href="#" className="ml-link">approach</a> to product development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Progress & Animations */}
        <section className="scene-module">
          <div className="max-w-6xl mx-auto px-veo-6">
            <MLSectionTitle variant="headline" className="mb-veo-6">
              Progress Bars & Animations
            </MLSectionTitle>
            
            <div className="space-y-veo-6">
              <div>
                <MLText variant="title" className="mb-veo-4">Gradient Progress Bars</MLText>
                <div className="space-y-veo-4">
                  <div>
                    <MLText variant="bodyS" color="weak" className="mb-veo-2">Static Progress (75%)</MLText>
                    <div className="ml-progress">
                      <div className="ml-progress__bar" style={{ '--value': '75%' } as any} />
                    </div>
                  </div>
                  
                  <div>
                    <MLText variant="bodyS" color="weak" className="mb-veo-2">Animated Progress (45%)</MLText>
                    <div className="ml-progress">
                      <div className="ml-progress__bar is-animated" style={{ '--value': '45%' } as any} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <MLText variant="title" className="mb-veo-4">Reveal Animations</MLText>
                <div className="space-y-veo-4">
                  <motion.div 
                    className="ml-reveal is-visible"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="p-veo-6 bg-surface-1 rounded-veo-lg">
                      <MLText variant="body">
                        This content uses the ml-reveal animation utility class
                      </MLText>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility Testing */}
        <section className="scene-module bg-surface/30">
          <div className="max-w-6xl mx-auto px-veo-6">
            <MLSectionTitle variant="headline" className="mb-veo-6">
              Accessibility Features
            </MLSectionTitle>
            
            <div className="space-y-veo-6">
              <div>
                <MLText variant="title" className="mb-veo-4">Focus Management</MLText>
                <div className="space-y-veo-4">
                  <input 
                    type="text" 
                    placeholder="Focusable input with ML styles" 
                    className="ml-focusable px-veo-4 py-veo-3 border border-outline rounded-veo-lg w-full max-w-md"
                  />
                  <button className="ml-focusable px-veo-4 py-veo-2 border border-outline rounded-veo-lg">
                    Focusable element
                  </button>
                </div>
              </div>
              
              <div>
                <MLText variant="title" className="mb-veo-4">Color Contrast Testing</MLText>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-veo-4">
                  <div className="p-veo-4 bg-surface-1 rounded-veo-lg">
                    <MLText variant="body" color="text">Primary text on surface</MLText>
                    <MLText variant="body" color="weak">Secondary text on surface</MLText>
                  </div>
                  <div className="p-veo-4 rounded-veo-lg" style={{ backgroundColor: 'var(--ml-primary)' }}>
                    <MLText variant="body" className="text-white">White text on primary</MLText>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Test Instructions */}
        <section className="scene-module">
          <div className="max-w-4xl mx-auto px-veo-6 text-center">
            <MLSectionTitle variant="headline" className="mb-veo-6">
              Manual Testing Checklist
            </MLSectionTitle>
            
            <div className="text-left bg-surface-1 p-veo-6 rounded-veo-lg">
              <MLText variant="body" className="mb-veo-4 font-medium">
                Please verify the following:
              </MLText>
              <ul className="space-y-veo-2 text-sm">
                <li>✅ ML buttons show Electric Indigo (#6366F1) background</li>
                <li>✅ Hover effects work on all interactive elements</li>
                <li>✅ Focus rings appear when using keyboard navigation</li>
                <li>✅ Links show gradient underlines with shimmer on hover</li>
                <li>✅ Progress bars display gradient fills</li>
                <li>✅ Animations respect prefers-reduced-motion</li>
                <li>✅ Text contrast meets WCAG standards</li>
                <li>✅ All elements are keyboard accessible</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};