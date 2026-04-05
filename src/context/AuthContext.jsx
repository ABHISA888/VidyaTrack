import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const savedUser = localStorage.getItem('vidyatrack_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (credentials) => {
    // Mock login for DEO
    // In a real app, this would be an API call
    if (credentials.role === 'DEO' && credentials.password === 'deo123') {
      const userData = {
        id: 'deo-001',
        name: 'District Education Officer',
        role: 'DEO',
        district: 'Indore',
        loggedInAt: new Date().toISOString()
      };
      setUser(userData);
      localStorage.setItem('vidyatrack_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials. Please use DEO credentials.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vidyatrack_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
