import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [loading, setLoading] = useState(true);
  
  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (!token) {
        console.error('No token found in localStorage'); // Log missing token
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 422) {
          console.error('Invalid token or server validation failed');
        }

        if (!response.ok) {
          if (refreshToken) {
            const refreshResponse = await fetch('http://localhost:5000/api/auth/refresh', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${refreshToken}`
              }
            });

            if (refreshResponse.status === 422) {
              console.error('Invalid refresh token or server validation failed');
            }

            if (!refreshResponse.ok) {
              throw new Error('Token refresh failed');
            }

            const refreshData = await refreshResponse.json();
            localStorage.setItem('token', refreshData.access_token);

            const retryResponse = await fetch('http://localhost:5000/api/auth/me', {
              headers: {
                'Authorization': `Bearer ${refreshData.access_token}`
              }
            });

            if (!retryResponse.ok) {
              throw new Error('Authentication failed after token refresh');
            }

            const retryData = await retryResponse.json();
            setUser(retryData.user);
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true'); // Persist state
          } else {
            throw new Error('No refresh token available');
          }
        } else {
          const data = await response.json();
          setUser(data.user);
          setIsAuthenticated(true);
          localStorage.setItem('isAuthenticated', 'true'); // Persist state
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);
  
  // Login function
  const login = (userData, accessToken, refreshToken) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    if (accessToken) localStorage.setItem('token', accessToken);
    if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setUser(null);
    setIsAuthenticated(false);
  };
  
  // Update user data
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  // Context value
  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
