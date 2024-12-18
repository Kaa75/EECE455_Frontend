import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import MyDrawer from './components/Drawer';
import HomePage from './pages/Homepage';
import Affine from './pages/AffineCipherPage';
import MonoAlphabetic from './pages/MonoAlphabeticPage';
import Vigenere from './pages/VigenerePage';
import Hill from './pages/HillCipherPage';
import Playfair from './pages/PlayfairPage';
import ExtendedGCD from './pages/EuclidPage';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="background">
      <div className="container">
        {!isHomePage && <MyDrawer />} {/* Hide Drawer on homepage */}
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/affine" element={<Affine />} />
          <Route path="/monoalphabetic" element={<MonoAlphabetic />} />
          <Route path="/vigenere" element={<Vigenere />} />
          <Route path="/hill" element={<Hill />} />
          <Route path="/playfair" element={<Playfair />} />
          <Route path="/extendedgcd" element={<ExtendedGCD />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;