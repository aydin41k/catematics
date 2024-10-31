// src/context/SettingsContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [problemTypes, setProblemTypes] = useState(['addition', 'subtraction']);
  const [difficulty, setDifficulty] = useState('easy'); // 'easy', 'medium', 'hard'

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      const { problemTypes, difficulty } = JSON.parse(savedSettings);
      setProblemTypes(problemTypes);
      setDifficulty(difficulty);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      'settings',
      JSON.stringify({ problemTypes, difficulty })
    );
  }, [problemTypes, difficulty]);

  return (
    <SettingsContext.Provider
      value={{
        problemTypes,
        setProblemTypes,
        difficulty,
        setDifficulty,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
