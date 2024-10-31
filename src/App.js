// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Game from './components/Game/Game';
import ActivityLog from './components/ActivityLog/ActivityLog';
import Settings from './components/Settings/Settings';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { SettingsProvider } from './context/SettingsContext';
import { ActivityLogProvider } from './context/ActivityLogContext';
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
  return (
    <SettingsProvider>
      <ActivityLogProvider>
        <Router>
          <GlobalStyles />
          <Header />
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/game" element={<Game />} />
            <Route path="/activity-log" element={<ActivityLog />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <Footer />
        </Router>
      </ActivityLogProvider>
    </SettingsProvider>
  );
};

export default App;