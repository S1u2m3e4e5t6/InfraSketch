import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import Editor from './components/Editor';

type AppState = 'landing' | 'editor';

function App() {
  const [currentView, setCurrentView] = useState<AppState>('landing');

  const handleStartDesigning = () => {
    setCurrentView('editor');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onStartDesigning={handleStartDesigning} />
          </motion.div>
        )}
        
        {currentView === 'editor' && (
          <motion.div
            key="editor"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Editor onBack={handleBackToLanding} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;