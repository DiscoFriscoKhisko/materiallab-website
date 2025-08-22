import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Landing } from './pages/Landing/Landing';
import { Contact } from './pages/Contact/Contact';
import { Services } from './pages/Services/Services';
import { Work } from './pages/Work/Work';
import { Approach } from './pages/Approach/Approach';
import { Insights } from './pages/Insights/Insights';
import { About } from './pages/About/About';
import { TestShowcase } from './pages/TestShowcase/TestShowcase';
import { NotFound } from './pages/NotFound/NotFound';

function App() {
  return (
    <LanguageProvider>
      <Router>
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
      </Router>
    </LanguageProvider>
  );
}

export default App;