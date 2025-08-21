import { Layout } from '../../components/Layout/Layout';
import { ServiceCards } from '../../components/ServiceCards/ServiceCards';
import { motion } from 'framer-motion';
import { MLButton, MLCard, MLText, MLHeading } from '../../components/ML';
import { useNavigate } from 'react-router-dom';

const explorativeUserServices = [
  {
    title: 'Explore & Imagine',
    description: 'Uncover hidden opportunities and explore new directions',
    icon: '🚀',
    color: 'purple',
    items: [
      'Workshops to uncover opportunities',
      'User and market research to spot hidden potential',
      'Concept sketches and prototypes to try different directions',
      'Innovation brainstorming sessions'
    ]
  },
  {
    title: 'Design Possibilities',
    description: 'Creative exploration of what could be possible',
    icon: '✨',
    color: 'blue',
    items: [
      'Creative exploration of UX/UI styles and approaches',
      'Playful, bold, or minimal—find what fits your vision',
      'Interactive prototypes you can test and refine',
      'Multiple design concepts to explore'
    ]
  },
  {
    title: 'Build Experiments',
    description: 'Rapid testing and validation of new ideas',
    icon: '🔬',
    color: 'green',
    items: [
      'Rapid MVPs to explore new product spaces',
      'Lightweight apps, sites, or automations you can test in the real world',
      'Tech demos to see what\'s possible with AI and modern tools',
      'Quick validation experiments'
    ]
  },
  {
    title: 'AI Futures',
    description: 'Discover how AI can transform your business',
    icon: '🌟',
    color: 'orange',
    items: [
      'Brainstorming sessions on where AI could reshape your business',
      'Pilots of AI-driven workflows or features',
      'Safe experiments with automation and generative tools',
      'Future-focused strategy sessions'
    ]
  },
  {
    title: 'Ongoing Discovery',
    description: 'Iterative collaboration with room to evolve',
    icon: '🌱',
    color: 'indigo',
    items: [
      'Iterative design and development with room to pivot',
      'Open-ended collaboration to shape your product as it evolves',
      'Growth experiments to uncover what resonates',
      'Continuous learning and adaptation'
    ]
  }
];

export const ExplorativeUser = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="relative overflow-hidden bg-bg min-h-screen">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-ion/20 to-coral/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-20 right-1/4 w-48 h-48 bg-gradient-to-r from-coral/15 to-ion/15 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-ion/10 to-coral/10 rounded-full blur-2xl"
            animate={{ scale: [1, 1.3, 1], x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Hero Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-ion/20 border border-ion/30 rounded-full text-ion font-medium text-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M13 10V3L4 14h7v7l9-11h-7z" clipRule="evenodd" />
              </svg>
              For the Explorative User
            </motion.div>
              
              <motion.h1
                className="text-h1 font-bold font-display mb-8 leading-tight text-text"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Not Sure What's Next?
                <span className="block bg-gradient-to-r from-ion to-coral bg-clip-text text-transparent">Let's Explore Together.</span>
              </motion.h1>
              
              <motion.p 
                className="text-body-l text-text-weak mb-16 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Sometimes the best innovations come from curiosity and experimentation. 
                Let's co-create the right path forward and discover what's possible.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <MLButton
                  variant="filled"
                  size="lg"
                  onClick={() => navigate('/contact', { state: { projectType: 'explorative' } })}
                  iconRight={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  }
                >
                  Start Exploring
                </MLButton>
                <MLButton
                  variant="outlined"
                  size="lg"
                  onClick={() => navigate('/contact', { state: { projectType: 'explorative' } })}
                >
                  Book a Discovery Call
                </MLButton>
              </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <MLHeading level={2} className="mb-6">
                Our Discovery Journey
              </MLHeading>
              <MLText variant="bodyL" color="weak" className="max-w-3xl mx-auto">
                An open-ended, creative process that adapts to your needs and 
                helps you discover breakthrough opportunities.
              </MLText>
            </motion.div>

            <ServiceCards services={explorativeUserServices} variant="explorative" />
          </div>
        </section>

        {/* Innovation Showcase */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <MLHeading level={2} className="mb-6">
                Where Exploration Leads
              </MLHeading>
              <MLText variant="bodyL" color="weak" className="max-w-2xl mx-auto">
                See what happens when curiosity meets expertise
              </MLText>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {[
                {
                  title: "AI-Powered Analytics",
                  description: "Started as data exploration, became a predictive insights platform",
                  icon: "📊"
                },
                {
                  title: "Smart Automation",
                  description: "Began with workflow questions, evolved into intelligent process automation",
                  icon: "⚙️"
                },
                {
                  title: "User Experience Innovation",
                  description: "Creative UX experiments led to breakthrough interaction patterns",
                  icon: "💡"
                }
              ].map((example, index) => (
                <MLCard key={index} className="p-6 bg-gradient-to-br from-ion/10 to-coral/10 border-ion/20" hover={true}>
                  <div className="text-4xl mb-4">{example.icon}</div>
                  <MLHeading level={4} className="mb-2">{example.title}</MLHeading>
                  <MLText color="weak">{example.description}</MLText>
                </MLCard>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <MLCard className="p-12 bg-gradient-to-br from-ion/10 to-coral/10 border-ion/20">
              <MLHeading level={2} className="mb-6">
                Not sure what's next? We'll explore the possibilities with you and co-create the right path forward.
              </MLHeading>
              <MLText variant="bodyL" color="weak" className="mb-8 max-w-2xl mx-auto">
                Let's start with curiosity and see where it takes us.
              </MLText>
              <MLButton
                variant="filled"
                size="lg"
                onClick={() => navigate('/contact', { state: { projectType: 'explorative' } })}
                iconRight={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                Begin the Journey
              </MLButton>
            </MLCard>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};