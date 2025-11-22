// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const USER_ROLES = {
  PARTICIPANT: 'participant',
  TEAM_LEAD: 'team_lead',
  EXPERT: 'expert',
  JUDGE: 'judge',
  ADMIN: 'admin',
  ORGANIZER: 'organizer'
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const mockUsers = {
    participant: {
      id: '1',
      email: 'participant@example.com',
      name: 'Иван Участников',
      role: USER_ROLES.PARTICIPANT,
      skills: ['React', 'Node.js'],
      teamId: 'team1'
    },
    expert: {
      id: '2',
      email: 'expert@example.com',
      name: 'Петр Экспертов',
      role: USER_ROLES.EXPERT,
      specialization: ['Frontend', 'UI/UX']
    },
    admin: {
      id: '3',
      email: 'admin@example.com',
      name: 'Админ Админов',
      role: USER_ROLES.ADMIN
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password, role) => {
    try {
      setLoading(true);
      
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let userData;
      switch(role) {
        case 'participant':
          userData = mockUsers.participant;
          break;
        case 'expert':
          userData = mockUsers.expert;
          break;
        case 'admin':
          userData = mockUsers.admin;
          break;
        default:
          throw new Error('Invalid role');
      }

      const token = 'mock-jwt-token-' + Date.now();

      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));

      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Ошибка авторизации' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: 'user-' + Date.now(),
        email: userData.email,
        name: userData.name,
        role: USER_ROLES.PARTICIPANT,
        skills: userData.skills || [],
        ...userData
      };

      const token = 'mock-jwt-token-' + Date.now();

      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(newUser));

      setUser(newUser);
      setIsAuthenticated(true);
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.message || 'Ошибка регистрации' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
  };

  const hasRole = (allowedRoles) => {
    if (!user || !user.role) return false;
    if (Array.isArray(allowedRoles)) {
      return allowedRoles.includes(user.role);
    }
    return user.role === allowedRoles;
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateUser,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
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

export { USER_ROLES };
