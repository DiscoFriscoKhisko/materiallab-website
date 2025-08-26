import { motion } from 'framer-motion';
import { VeoVideoCard } from './VeoVideoCard';

interface Feature {
  id: string;
  title: string;
  description: string;
  prompt?: string;
  videoSrc: string;
  posterSrc?: string;
  aspectRatio?: '16:9' | '9:16' | '1:1';
}

interface VeoFeatureGridProps {
  title: string;
  subtitle?: string;
  features: Feature[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export const VeoFeatureGrid = ({
  title,
  subtitle,
  features,
  columns = 3,
  className = ''
}: VeoFeatureGridProps) => {
  const gridColsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className={`py-20 ${className}`}>
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
            {title}
          </h2>
          {subtitle && (
            <p className="font-veo text-veo-text-body text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          className={`grid ${gridColsClasses[columns]} gap-8`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              custom={index}
            >
              <VeoVideoCard
                title={feature.title}
                description={feature.description}
                prompt={feature.prompt}
                videoSrc={feature.videoSrc}
                posterSrc={feature.posterSrc}
                aspectRatio={feature.aspectRatio}
                className="h-full"
                onPlay={() => console.log(`Playing: ${feature.title}`)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More / View All (Optional) */}
        {features.length > 6 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button className="font-veo text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              View All Features →
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Sample data for MaterialLab features
export const materialLabFeatures: Feature[] = [
  {
    id: 'ai-strategy',
    title: 'AI Strategy & Consulting',
    description: 'Define your AI roadmap and identify the highest-impact opportunities for your business.',
    prompt: 'Create a comprehensive AI strategy for a fintech startup',
    videoSrc: 'https://cdn.pixabay.com/vimeo/395498908/strategy-29439.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: '16:9'
  },
  {
    id: 'product-development',
    title: 'AI Product Development',
    description: 'Build production-ready AI applications with modern frameworks and best practices.',
    prompt: 'Develop a machine learning model for customer sentiment analysis',
    videoSrc: 'https://cdn.pixabay.com/vimeo/459126904/development-50616.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: '16:9'
  },
  {
    id: 'team-augmentation',
    title: 'Team Augmentation',
    description: 'Scale your team with experienced AI engineers and product specialists.',
    prompt: 'Augment development team with senior ML engineers',
    videoSrc: 'https://cdn.pixabay.com/vimeo/287045372/team-15955.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: '16:9'
  },
  {
    id: 'mvp-launchpad',
    title: 'MVP Launchpad',
    description: 'Go from validated idea to paying customers with our proven 8-week sprint methodology.',
    prompt: 'Launch an MVP for a B2B SaaS product in 8 weeks',
    videoSrc: 'https://cdn.pixabay.com/vimeo/387532463/rocket-28145.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: '16:9'
  },
  {
    id: 'automation',
    title: 'Process Automation',
    description: 'Reduce manual work by 80% with intelligent automation workflows and systems.',
    prompt: 'Automate customer support workflows using AI',
    videoSrc: 'https://cdn.pixabay.com/vimeo/449239294/automation-49238.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: '16:9'
  },
  {
    id: 'analytics',
    title: 'AI-Powered Analytics',
    description: 'Transform raw data into actionable insights with machine learning and predictive analytics.',
    prompt: 'Build predictive analytics dashboard for sales forecasting',
    videoSrc: 'https://cdn.pixabay.com/vimeo/421442134/analytics-41278.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: '16:9'
  }
];

// Default props
VeoFeatureGrid.defaultProps = {
  title: "Our AI Solutions",
  subtitle: "End-to-end AI product development with a focus on business impact and user experience.",
  features: materialLabFeatures,
  columns: 3
};