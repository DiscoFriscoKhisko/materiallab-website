import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Suspense, lazy } from 'react';

// Lazy load pages for better performance
const Landing = lazy(() => import('./pages/Landing/Landing').then(m => ({ default: m.Landing })));
const Contact = lazy(() => import('./pages/Contact/Contact').then(m => ({ default: m.Contact })));
const Services = lazy(() => import('./pages/Services/Services').then(m => ({ default: m.Services })));
const Work = lazy(() => import('./pages/Work/Work').then(m => ({ default: m.Work })));
const Approach = lazy(() => import('./pages/Approach/Approach').then(m => ({ default: m.Approach })));
const Insights = lazy(() => import('./pages/Insights/Insights').then(m => ({ default: m.Insights })));
const About = lazy(() => import('./pages/About/About').then(m => ({ default: m.About })));
const TestShowcase = lazy(() => import('./pages/TestShowcase/TestShowcase').then(m => ({ default: m.TestShowcase })));
const NotFound = lazy(() => import('./pages/NotFound/NotFound').then(m => ({ default: m.NotFound })));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-text-weak">Loading...</p>
    </div>
  </div>
);

function App() {
  // Set basename for GitHub Pages deployment
  const basename = import.meta.env.PROD ? '/materiallab-website' : '/';
  
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Router basename={basename}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/what-we-do" element={<Services />} />
              <Route path="/approach" element={<Approach />} />
              <Route path="/lab-notes" element={<Insights />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/work" element={<Work />} />
              <Route path="/about" element={<About />} />
              <Route path="/test-showcase" element={<TestShowcase />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;