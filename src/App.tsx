import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing/Landing';
import { CertainUser } from './pages/CertainUser/CertainUser';
import { ExplorativeUser } from './pages/ExplorativeUser/ExplorativeUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/certain-user" element={<CertainUser />} />
        <Route path="/explorative-user" element={<ExplorativeUser />} />
      </Routes>
    </Router>
  );
}

export default App;