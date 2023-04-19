import react from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Search_pictures from './components/Main/Search_pictures';
import Gallery from './components/Gallery/Gallery';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Search_pictures />} />
          <Route path="/Gallery" element={<Gallery />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
