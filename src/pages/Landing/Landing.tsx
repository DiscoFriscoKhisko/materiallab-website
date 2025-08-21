import { Layout } from '../../components/Layout/Layout';
import { PathSelector } from '../../components/PathSelector/PathSelector';

export const Landing = () => {
  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-secondary-900 mb-8 leading-tight">
                Build AI Products
                <span className="block text-primary-600">That Actually Work</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-secondary-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                From concept to scale, we help you discover, design, and build AI-powered products 
                that solve real problems and drive real results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <div className="flex items-center space-x-2 text-secondary-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>AI-Native Development</span>
                </div>
                <div className="flex items-center space-x-2 text-secondary-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Proven Results</span>
                </div>
                <div className="flex items-center space-x-2 text-secondary-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>End-to-End Support</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-40 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          </div>
        </section>

        {/* Path Selection */}
        <PathSelector />

        {/* Trust Indicators */}
        <section className="py-16 bg-secondary-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                Trusted by Forward-Thinking Companies
              </h3>
              <p className="text-secondary-600 max-w-2xl mx-auto">
                From startups to enterprises, we've helped dozens of companies successfully 
                integrate AI into their products and workflows.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
              {/* Placeholder for client logos */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 font-medium">Client {i}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};