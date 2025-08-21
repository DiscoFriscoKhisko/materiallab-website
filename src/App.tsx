import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Landing } from './pages/Landing/Landing';
import { CertainUser } from './pages/CertainUser/CertainUser';
import { ExplorativeUser } from './pages/ExplorativeUser/ExplorativeUser';
import { Contact } from './pages/Contact/Contact';
import { WhatWeDoPage } from './pages/WhatWeDo/WhatWeDo';
import { CaseStudies } from './pages/CaseStudies/CaseStudies';
import { About } from './pages/About/About';
import { NotFound } from './pages/NotFound/NotFound';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/certain-user" element={<CertainUser />} />
          <Route path="/explorative-user" element={<ExplorativeUser />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/what-we-do" element={<WhatWeDoPage />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;