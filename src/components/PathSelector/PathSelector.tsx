import { useNavigate } from 'react-router-dom';

export const PathSelector = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-6">
          Do you already know what you need?
        </h2>
        <p className="text-xl text-secondary-600 mb-12 max-w-2xl mx-auto">
          Choose your path to discover how MaterialLab can help bring your AI product vision to life.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div 
            onClick={() => navigate('/certain-user')}
            className="group cursor-pointer p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
          >
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">Yes, I know what I want</h3>
            <p className="text-secondary-600 mb-6">
              You have a clear vision and specific requirements. Let's build it fast, reliable, and ready to scale.
            </p>
            <div className="btn-primary inline-flex items-center group-hover:bg-green-600">
              Get Started
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div 
            onClick={() => navigate('/explorative-user')}
            className="group cursor-pointer p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">I'm exploring possibilities</h3>
            <p className="text-secondary-600 mb-6">
              You're curious about what's possible and want to discover new opportunities. Let's explore together.
            </p>
            <div className="btn-secondary inline-flex items-center group-hover:bg-purple-50">
              Explore With Us
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};