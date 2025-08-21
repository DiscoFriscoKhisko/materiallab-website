import { Layout } from '../../components/Layout/Layout';
import { ServiceCards } from '../../components/ServiceCards/ServiceCards';
import { motion } from 'framer-motion';
import { MLButton, MLCard, MLText, MLHeading } from '../../components/ML';
import { useNavigate } from 'react-router-dom';

const certainUserServices = [
  {
    title: 'Discover',
    description: 'Fast research and validation to confirm your direction',
    icon: '',
    color: 'blue',
    items: [
      'Market and competitor scans to reduce risk',
      'Clear product requirements before we build',
      'Technical feasibility assessment',
      'User research and validation'
    ]
  },
  {
    title: 'Design',
    description: 'UX/UI tailored to your audience with proven efficiency',
    icon: '',
    color: 'purple',
    items: [
      'UX/UI tailored to your audience',
      'Flows and journeys that are efficient and proven',
      'Design systems for scale and consistency',
      'Interactive prototypes and wireframes'
    ]
  },
  {
    title: 'Build',
    description: 'Full-stack development with modern technologies',
    icon: '',
    color: 'green',
    items: [
      'Web and mobile app development (Android; iOS soon)',
      'Backend, cloud, APIs, and third-party integrations',
      'Reporting, analytics, and monitoring baked in',
      'Scalable architecture from day one'
    ]
  },
  {
    title: 'AI Applied',
    description: 'Intelligent automation and AI features',
    icon: '',
    color: 'orange',
    items: [
      'Automation of defined workflows',
      'AI features integrated into your product (recommendations, search, copilots)',
      'Business process improvements where you already see the need',
      'Custom AI model training and deployment'
    ]
  },
  {
    title: 'Support & Scale',
    description: 'Ongoing maintenance and growth support',
    icon: '',
    color: 'indigo',
    items: [
      'Maintenance, uptime, and performance management',
      'Roadmap ownership and regular releases',
      'Analytics-driven growth loops',
      '24/7 monitoring and support'
    ]
  }
];

export const CertainUser = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="relative overflow-hidden bg-bg min-h-screen">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-coral/20 to-success/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-20 right-1/4 w-48 h-48 bg-gradient-to-r from-success/15 to-coral/15 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Hero Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-success/20 border border-success/30 rounded-full text-success font-medium text-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              For the Certain User
            </motion.div>
              
              <motion.h1
                className="text-h1 font-bold font-display mb-8 leading-tight text-text"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                You Know What You Need.
                <span className="block bg-gradient-to-r from-coral to-success bg-clip-text text-transparent">We'll Help You Build It.</span>
              </motion.h1>
              
              <motion.p 
                className="text-body-l text-text-weak mb-16 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Fast, reliable, and ready to scale. Our structured approach takes your clear vision 
                and builds it into a production-ready AI product.
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
                  onClick={() => navigate('/contact', { state: { projectType: 'certain' } })}
                  iconRight={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  }
                >
                  Start Your Project
                </MLButton>
                <MLButton
                  variant="outlined"
                  size="lg"
                  onClick={() => navigate('/work')}
                >
                  View Case Studies
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
                Our Proven Process
              </MLHeading>
              <MLText variant="bodyL" color="weak" className="max-w-3xl mx-auto">
                A systematic approach that takes you from concept to scale, 
                with clear milestones and measurable outcomes at every step.
              </MLText>
            </motion.div>

            <ServiceCards services={certainUserServices} variant="certain" />
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
            <MLCard className="p-12 bg-gradient-to-br from-coral/10 to-success/10 border-coral/20">
              <MLHeading level={2} className="mb-6">
                You know what you need. We'll help you build it—fast, reliable, and ready to scale.
              </MLHeading>
              <MLText variant="bodyL" color="weak" className="mb-8 max-w-2xl mx-auto">
                Let's turn your clear vision into reality with our proven development process.
              </MLText>
              <MLButton
                variant="filled"
                size="lg"
                onClick={() => navigate('/contact', { state: { projectType: 'certain' } })}
                iconRight={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                Get Started Today
              </MLButton>
            </MLCard>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};