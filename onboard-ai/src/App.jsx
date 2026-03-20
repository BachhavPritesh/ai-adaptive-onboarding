import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import UploadInterface from './pages/UploadInterface';
import Dashboard from './pages/Dashboard';
import Solutions from './pages/Solutions';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import BackgroundEffects from './components/BackgroundEffects';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import SkillAnalysis from './pages/SkillAnalysis';
import StudyModule from './pages/StudyModule';

const AnimatedRoutes = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';
  const isStudyPage = location.pathname.startsWith('/study/');

  return (
    <div className="app-container">
      {!isStudyPage && <BackgroundEffects />}
      {!isStudyPage && <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}

      <main style={isAuthPage || isStudyPage ? { padding: 0 } : {}}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={isAuthPage ? "full-view" : "container"}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/features" element={<Features />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/upload" element={<UploadInterface />} />
              <Route path="/dashboard" element={<Dashboard searchQuery={searchQuery} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/skill-analysis" element={<SkillAnalysis />} />
              <Route path="/study/:moduleId" element={<StudyModule />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
