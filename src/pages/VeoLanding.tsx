import { motion } from 'framer-motion';
import { Layout } from '../components/Layout/Layout';
import { VeoHero } from '../components/VeoHero';
import { VeoFeatureGrid, materialLabFeatures } from '../components/VeoFeatureGrid';
import { VeoServiceCard, ServiceIcons } from '../components/VeoServiceCard';
import { VeoVideoCard } from '../components/VeoVideoCard';
import { Button } from '../components/UI';
import { useNavigate } from 'react-router-dom';

export const VeoLanding = () => {
  const navigate = useNavigate();

  // Service data for MaterialLab
  const services = [
    {
      title: 'AI Strategy & Consulting',
      description: 'Define your AI roadmap and identify the highest-impact opportunities for your business.',
      features: [
        'AI opportunity assessment',
        'Technical feasibility analysis',
        'ROI modeling and planning',
        'Implementation roadmap'
      ],
      price: 'Starting at $15k',
      icon: ServiceIcons.Strategy,
      variant: 'default' as const,
      ctaText: 'Learn More'
    },
    {
      title: 'AI Product Development',
      description: 'Build production-ready AI applications with modern frameworks and best practices.',
      features: [
        'Full-stack AI applications',
        'Machine learning model development',
        'API design and integration',
        'Cloud deployment and scaling'
      ],
      price: 'Starting at $50k',
      icon: ServiceIcons.Development,
      variant: 'featured' as const,
      badge: 'Most Popular',
      ctaText: 'Start Project'
    },
    {
      title: 'Team Augmentation',
      description: 'Scale your team with experienced AI engineers and product specialists.',
      features: [
        'Senior ML engineers',
        'AI product managers',
        'Technical leadership',
        'Knowledge transfer'
      ],
      price: 'From $8k/month',
      icon: ServiceIcons.Team,
      variant: 'default' as const,
      ctaText: 'Hire Team'
    }
  ];

  // Partnership/testimonial data
  const partnerships = [
    {
      title: 'FinTech Startup Success',
      description: '0 to 10k users in 8 weeks with our MVP Launchpad program',
      quote: 'MaterialLab delivered exactly what we needed, when we needed it.',
      author: 'Sarah Chen, CEO at FinFlow',
      videoSrc: 'https://cdn.pixabay.com/vimeo/459126904/development-50616.mp4',
      posterSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'E-commerce Automation',
      description: '80% reduction in manual work through intelligent automation',
      quote: 'Game changer. We went from drowning in admin work to focusing on growth.',
      author: 'Marcus Thompson, Founder at EcoShop',
      videoSrc: 'https://cdn.pixabay.com/vimeo/449239294/automation-49238.mp4',
      posterSrc: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <VeoHero
        title="AI Product Studio"
        subtitle="Building next-generation AI experiences that solve real problems. From concept to deployment, we're your technical partner."
        primaryCta={{
          text: 'See Our Portfolio',
          path: '/work'
        }}
        secondaryCta={{
          text: 'Start a Project',
          path: '/contact'
        }}
      />

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-veo text-veo-text-headline font-medium text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="font-veo text-veo-text-body text-gray-600 max-w-2xl mx-auto leading-relaxed">
              End-to-end AI product development with a focus on business impact and user experience.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <VeoServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                features={service.features}
                price={service.price}
                icon={service.icon}
                badge={service.badge}
                variant={service.variant}
                ctaText={service.ctaText}
                onCtaClick={() => navigate('/contact')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities Feature Grid */}
      <VeoFeatureGrid
        title="AI Capabilities"
        subtitle="See how our AI solutions transform business operations and create new opportunities."
        features={materialLabFeatures}
        columns={3}
      />

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-veo text-veo-text-headline font-medium text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="font-veo text-veo-text-body text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Real results from real projects. See how we've helped startups and companies build products people love.
            </p>
          </motion.div>

          {/* Success Stories Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {partnerships.map((story, index) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <VeoVideoCard
                  title={story.title}
                  description={story.description}
                  videoSrc={story.videoSrc}
                  posterSrc={story.posterSrc}
                  aspectRatio="16:9"
                  lazy={true}
                />
                
                {/* Testimonial Quote */}
                <motion.div
                  className="mt-6 p-6 bg-blue-50 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="font-veo text-gray-700 italic mb-4">
                    "{story.quote}"
                  </p>
                  <p className="font-veo text-gray-600 font-medium">
                    — {story.author}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-veo text-veo-text-headline font-medium text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="font-veo text-veo-text-body text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A proven methodology that combines discovery, strategy, and execution to deliver results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your business goals and technical requirements' },
              { step: '02', title: 'Strategy', description: 'Defining the AI solution architecture and implementation approach' },
              { step: '03', title: 'Development', description: 'Building your AI product with regular feedback and iterations' },
              { step: '04', title: 'Launch', description: 'Deploying and optimizing your solution for maximum impact' }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold mb-6 mx-auto"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {step.step}
                </motion.div>
                <h3 className="font-veo text-veo-text-title font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="font-veo text-veo-text-body text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <motion.div
          className="max-w-4xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-veo text-veo-text-headline font-medium text-gray-900 mb-6">
            Ready to build something great?
          </h2>
          <p className="font-veo text-veo-text-body text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's discuss your project and explore how we can help bring your AI vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="filled"
              size="lg"
              onClick={() => navigate('/contact')}
              className="bg-blue-500 text-white hover:bg-blue-600 font-veo font-medium px-8 py-4 text-lg transition-all duration-200 hover:scale-105"
            >
              Start a Project
            </Button>
            <Button
              variant="outlined"
              size="lg"
              onClick={() => navigate('/work')}
              className="border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500 font-veo font-medium px-8 py-4 text-lg transition-all duration-200 hover:scale-105"
            >
              View Our Work
            </Button>
          </div>
        </motion.div>
      </section>
      </div>
    </Layout>
  );
};