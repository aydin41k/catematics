// src/context/ActivityLogContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ActivityLogContext = createContext();

export const ActivityLogProvider = ({ children }) => {
  const [activityLog, setActivityLog] = useState([]);

  // Load activity log from localStorage on mount
  useEffect(() => {
    const savedLog = localStorage.getItem('activityLog');
    if (savedLog) {
      setActivityLog(JSON.parse(savedLog));
    }
  }, []);

  // Save activity log to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('activityLog', JSON.stringify(activityLog));
  }, [activityLog]);

  const addLogEntry = (entry) => {
    setActivityLog((prevLog) => {
      const updatedLog = [entry, ...prevLog];
      return updatedLog.slice(0, 100); // Keep only the last 100 entries
    });
  };

  const clearLog = () => {
    setActivityLog([]);
  };

  return (
    <ActivityLogContext.Provider
      value={{
        activityLog,
        addLogEntry,
        clearLog,
      }}
    >
      {children}
    </ActivityLogContext.Provider>
  );
};
