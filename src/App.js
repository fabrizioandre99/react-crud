// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedLayout from './components/layouts/ProtectedLayout';
import CrudComponent from './components/pages/CrudComponent';
import Reportes from './components/pages/Reportes';
import Login from './components/auth/Login';/* 
import UserProfile from './components/pages/UserProfile';
import Roles from './components/pages/Roles';
import NotificationHistory from './components/pages/NotificationHistory';
 */import Teams from './components/pages/Teams';

const PrivateRoute = ({ children }) => {
  return localStorage.getItem('auth') ? children : <Navigate to="/login" />;
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ProtectedLayout toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
              </PrivateRoute>
            }
          >
            <Route path="/usuarios" element={<CrudComponent />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/" element={<Navigate to="/usuarios" />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
