import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Suspense, lazy } from 'react';

// Typography System (integrated into main index.css)

// Lazy load pages for better performance
const Landing = lazy(() => import('./pages/Landing/Landing').then(m => ({ default: m.Landing })));
// VeoLanding temporarily disabled due to VEO component cleanup
// const VeoLanding = lazy(() => import('./pages/VeoLanding').then(m => ({ default: m.VeoLanding })));
const Contact = lazy(() => import('./pages/Contact/Contact').then(m => ({ default: m.Contact })));
const Services = lazy(() => import('./pages/Services/Services').then(m => ({ default: m.Services })));
const Work = lazy(() => import('./pages/Work/Work').then(m => ({ default: m.Work })));
const Approach = lazy(() => import('./pages/Approach/Approach').then(m => ({ default: m.Approach })));
const Insights = lazy(() => import('./pages/Insights/Insights').then(m => ({ default: m.Insights })));
const About = lazy(() => import('./pages/About/About').then(m => ({ default: m.About })));
const NotFound = lazy(() => import('./pages/NotFound/NotFound').then(m => ({ default: m.NotFound })));
// Design system pages removed - using Sandbox as the primary design reference
const Sandbox = lazy(() => import('./pages/Sandbox'));
const Version = lazy(() => import('./pages/Version/Version'));

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
        <ThemeProvider>
          <Router basename={basename}>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  {/* <Route path="/veo" element={<VeoLanding />} /> */}
                  <Route path="/services" element={<Services />} />
                  <Route path="/what-we-do" element={<Services />} />
                  <Route path="/approach" element={<Approach />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/lab-notes" element={<Insights />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/about" element={<About />} />
                  {/* Design system routes removed - use /sandbox for design reference */}
                  <Route path="/sandbox" element={<Sandbox />} />
                  <Route path="/version" element={<Version />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Router>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;