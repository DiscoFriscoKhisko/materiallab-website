import { Layout } from '../../components/Layout/Layout';
import { ServiceCards } from '../../components/ServiceCards/ServiceCards';

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
  return (
    <Layout>
      <div className="relative">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-800 font-medium text-sm mb-6">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M13 10V3L4 14h7v7l9-11h-7z" clipRule="evenodd" />
                </svg>
                For the Explorative User
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Not Sure What's Next?
                <span className="block text-purple-600">Let's Explore Together.</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                Sometimes the best innovations come from curiosity and experimentation. 
                Let's co-create the right path forward and discover what's possible.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary text-lg px-8 py-4 bg-purple-600 hover:bg-purple-700">
                  Start Exploring
                </button>
                <button className="btn-secondary text-lg px-8 py-4 border-purple-200 hover:bg-purple-50">
                  Book a Discovery Call
                </button>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
            <div className="absolute bottom-32 right-20 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '4s'}}></div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Our Discovery Journey
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                An open-ended, creative process that adapts to your needs and 
                helps you discover breakthrough opportunities.
              </p>
            </div>

            <ServiceCards services={explorativeUserServices} variant="explorative" />
          </div>
        </section>

        {/* Innovation Showcase */}
        <section className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Where Exploration Leads
              </h2>
              <p className="text-xl text-purple-200 max-w-2xl mx-auto">
                See what happens when curiosity meets expertise
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
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
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-4xl mb-4">{example.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{example.title}</h3>
                  <p className="text-purple-200">{example.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Not sure what's next? We'll explore the possibilities with you and co-create the right path forward.
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Let's start with curiosity and see where it takes us.
            </p>
            <button className="btn-primary text-lg px-8 py-4 bg-purple-600 hover:bg-purple-700">
              Begin the Journey
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
};