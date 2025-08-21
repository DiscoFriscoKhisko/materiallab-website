import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ML</span>
            </div>
            <span className="text-xl font-bold text-slate-900">MaterialLab</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Services
            </Link>
            <Link to="/about" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Contact
            </Link>
            <button className="btn-primary">
              Start Project
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};