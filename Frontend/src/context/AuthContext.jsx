import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('chimera_user');
    const savedToken = localStorage.getItem('chimera_token');

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('chimera_user');
        localStorage.removeItem('chimera_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData, authToken, rememberMe = false) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('chimera_token', authToken);
    localStorage.setItem('chimera_user', JSON.stringify(userData));

    if (rememberMe) {
      localStorage.setItem('chimera_remember_me', 'true');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('chimera_user');
    localStorage.removeItem('chimera_token');
    localStorage.removeItem('chimera_remember_me');
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('chimera_user', JSON.stringify(userData));
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
