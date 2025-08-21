import { Layout } from '../../components/Layout/Layout';
import { ServiceCards } from '../../components/ServiceCards/ServiceCards';

const certainUserServices = [
  {
    title: 'Discover',
    description: 'Fast research and validation to confirm your direction',
    icon: '🔍',
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
    icon: '🎨',
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
    icon: '⚡',
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
    description: 'Intelligent automation and AI features integrated seamlessly',
    icon: '🤖',
    color: 'orange',
    items: [
      'Automation of defined workflows',
      'AI features integrated into your product (recommendations, search, copilots)',
      'Business process transformation where you already see the need',
      'Custom AI model training and deployment'
    ]
  },
  {
    title: 'Support & Scale',
    description: 'Ongoing maintenance and growth-driven optimization',
    icon: '📈',
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
  return (
    <Layout>
      <div className="relative">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 font-medium text-sm mb-6">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                For the Certain User
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                You Know What You Need.
                <span className="block text-primary-600">We'll Help You Build It.</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                Fast, reliable, and ready to scale. Our structured approach takes your clear vision 
                and transforms it into a production-ready AI product.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary text-lg px-8 py-4">
                  Start Your Project
                </button>
                <button className="btn-secondary text-lg px-8 py-4">
                  View Case Studies
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Our Proven Process
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                A systematic approach that takes you from concept to scale, 
                with clear milestones and measurable outcomes at every step.
              </p>
            </div>

            <ServiceCards services={certainUserServices} variant="certain" />
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              You know what you need. We'll help you build it—fast, reliable, and ready to scale.
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's turn your clear vision into reality with our proven development process.
            </p>
            <button className="btn-primary text-lg px-8 py-4 bg-white text-slate-900 hover:bg-gray-100">
              Get Started Today
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
};