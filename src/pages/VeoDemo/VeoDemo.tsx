import { VeoLayout, VeoSection, VeoGrid, VeoStack, VeoContentBlock } from '../../components/VeoLayout';
import { VeoButton, VeoLink, VeoArrowIcon } from '../../components/VeoButton';
import { VeoCard, VeoFeatureCard, VeoStatsCard, VeoTestimonialCard } from '../../components/VeoCard';
import { VeoImage, VeoHeroImage, PLACEHOLDER_IMAGES } from '../../components/VeoImage';
import { useVeoScroll, useVeoStaggered, useVeoParallax } from '../../hooks/useVeoAnimation';
import { motion } from 'framer-motion';

export const VeoDemo = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useVeoScroll({ threshold: 0.1 });
  const { setElementRef, visibleItems } = useVeoStaggered(6, { threshold: 0.2 });
  const { elementRef: parallaxRef, offset } = useVeoParallax(0.3);

  const features = [
    {
      title: 'AI-Powered Analytics',
      description: 'Advanced machine learning algorithms analyze your data to provide actionable insights and predictive analytics.',
      icon: '🧠',
      features: ['Real-time processing', 'Custom models', 'Automated reports']
    },
    {
      title: 'Seamless Integration', 
      description: 'Connect with your existing tools and workflows through our comprehensive API and pre-built integrations.',
      icon: '🔗',
      features: ['REST API', 'Webhooks', '100+ integrations']
    },
    {
      title: 'Enterprise Security',
      description: 'Bank-level security with end-to-end encryption, SOC 2 compliance, and advanced threat detection.',
      icon: '🛡️',
      features: ['256-bit encryption', 'SOC 2 certified', 'Zero-trust architecture']
    }
  ];

  const stats = [
    { value: '10M+', label: 'Data Points Processed', trend: { value: 23, isPositive: true }, icon: '📊' },
    { value: '99.9%', label: 'Uptime Guarantee', icon: '⚡' },
    { value: '45%', label: 'Efficiency Improvement', trend: { value: 12, isPositive: true }, icon: '📈' },
    { value: '24/7', label: 'Support Coverage', icon: '🎧' }
  ];

  const testimonial = {
    quote: "MaterialLab's AI solutions transformed how we approach data analysis. The insights we gain are incredibly valuable and the platform is intuitive to use.",
    author: {
      name: 'Sarah Chen',
      role: 'VP of Data Science',
      company: 'TechCorp',
      avatar: PLACEHOLDER_IMAGES.avatar
    },
    rating: 5
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Hero Section */}
      <VeoSection className="relative overflow-hidden" spacing="lg">
        <div 
          ref={parallaxRef}
          className="absolute inset-0 -z-10"
          style={{ transform: `translateY(${offset}px)` }}
        >
          <VeoHeroImage
            src={PLACEHOLDER_IMAGES.hero}
            alt="Abstract AI visualization background"
            overlay="dark"
            className="h-screen"
            priority
          />
        </div>
        
        <VeoLayout className="relative z-10">
          <div 
            ref={heroRef}
            className={`text-center max-w-4xl mx-auto veo-fade-in ${heroVisible ? 'veo-visible' : ''}`}
          >
            <motion.h1 
              className="veo-h1 text-on-primary mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={heroVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The Future of AI-Powered
              <br />
              <span className="bg-gradient-to-r from-primary to-ion bg-clip-text text-transparent">
                Data Intelligence
              </span>
            </motion.h1>
            
            <motion.p 
              className="veo-body text-on-surface/80 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={heroVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Transform your business with cutting-edge artificial intelligence. 
              Our platform delivers unprecedented insights from your data, 
              empowering you to make smarter decisions faster.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={heroVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <VeoButton 
                variant="primary" 
                size="lg"
                icon={<VeoArrowIcon />}
                iconPosition="right"
              >
                Start Free Trial
              </VeoButton>
              <VeoButton variant="outline" size="lg">
                Watch Demo
              </VeoButton>
            </motion.div>
          </div>
        </VeoLayout>
      </VeoSection>

      {/* Stats Section */}
      <VeoSection background="subtle" spacing="md">
        <VeoLayout>
          <VeoGrid columns={4} gap="lg">
            {stats.map((stat, index) => (
              <div 
                key={index}
                ref={setElementRef(index)}
                className={`veo-fade-in veo-delay-${index + 1} ${visibleItems[index] ? 'veo-visible' : ''}`}
              >
                <VeoStatsCard {...stat} />
              </div>
            ))}
          </VeoGrid>
        </VeoLayout>
      </VeoSection>

      {/* Features Section */}
      <VeoSection spacing="lg" id="main-content">
        <VeoLayout>
          <VeoStack space="xl" align="center">
            <div className="text-center max-w-3xl">
              <h2 className="veo-h2 text-on-surface mb-4">
                Powerful Features for Modern Teams
              </h2>
              <p className="veo-body text-on-surface-variant leading-relaxed">
                Everything you need to harness the power of AI and transform your data into actionable insights.
              </p>
            </div>

            <VeoGrid columns={3} gap="lg">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  ref={setElementRef(index + 4)}
                  className={`veo-fade-in veo-delay-${index + 2} ${visibleItems[index + 4] ? 'veo-visible' : ''}`}
                >
                  <VeoFeatureCard
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    features={feature.features}
                    action={{
                      label: 'Learn More',
                      href: '#'
                    }}
                  />
                </div>
              ))}
            </VeoGrid>
          </VeoStack>
        </VeoLayout>
      </VeoSection>

      {/* Content Block Example */}
      <VeoSection background="muted" spacing="lg">
        <VeoLayout>
          <VeoContentBlock>
            <VeoStack space="lg">
              <div>
                <h2 className="veo-h2 text-on-surface mb-4">
                  Built for Scale, Designed for Simplicity
                </h2>
                <p className="veo-body text-on-surface-variant leading-relaxed mb-6">
                  Our platform handles enterprise-level data processing while maintaining 
                  an intuitive interface that your entire team can use. From data scientists 
                  to business analysts, everyone gets the tools they need.
                </p>
                <VeoLink href="#" showArrow>
                  Explore our enterprise features
                </VeoLink>
              </div>
            </VeoStack>
            
            <VeoImage
              src={PLACEHOLDER_IMAGES.feature}
              alt="Dashboard interface showing AI analytics"
              aspectRatio="16:9"
              className="rounded-xl shadow-lg"
            />
          </VeoContentBlock>
        </VeoLayout>
      </VeoSection>

      {/* Testimonial Section */}
      <VeoSection spacing="md">
        <VeoLayout>
          <div className="max-w-4xl mx-auto">
            <VeoTestimonialCard {...testimonial} />
          </div>
        </VeoLayout>
      </VeoSection>

      {/* CTA Section */}
      <VeoSection background="subtle" spacing="lg">
        <VeoLayout>
          <VeoCard variant="elevated" padding="xl" className="text-center max-w-4xl mx-auto">
            <VeoStack space="lg" align="center">
              <div>
                <h2 className="veo-h2 text-on-surface mb-4">
                  Ready to Transform Your Data?
                </h2>
                <p className="veo-body text-on-surface-variant leading-relaxed max-w-2xl">
                  Join thousands of companies already using MaterialLab to unlock 
                  the full potential of their data with AI-powered insights.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <VeoButton 
                  variant="primary" 
                  size="lg"
                  icon={<VeoArrowIcon />}
                  iconPosition="right"
                >
                  Get Started Free
                </VeoButton>
                <VeoButton variant="ghost" size="lg">
                  Schedule Demo
                </VeoButton>
              </div>
            </VeoStack>
          </VeoCard>
        </VeoLayout>
      </VeoSection>

      {/* Footer */}
      <VeoSection spacing="sm" className="border-t border-outline/20">
        <VeoLayout>
          <div className="text-center">
            <p className="veo-caption text-on-surface-variant">
              © 2024 MaterialLab. Built with the Veo Design System.
            </p>
          </div>
        </VeoLayout>
      </VeoSection>
    </div>
  );
};