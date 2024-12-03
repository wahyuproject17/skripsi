import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem('userId') || null; // Store userId in localStorage
  });
  const [userLevel, setUserLevel] = useState(() => {
    return localStorage.getItem('userLevel') ? parseInt(localStorage.getItem('userLevel')) : null;
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || null;
  });
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          // Token expired
          logout();
        }
      } catch (err) {
        // Invalid token
        logout();
      }
    }
  }, [token]);

  const login = (id, level, name, token) => {
    setUserId(id);
    setUserLevel(level);
    setUsername(name);
    setToken(token);
    localStorage.setItem('userId', id);
    localStorage.setItem('userLevel', level.toString());
    localStorage.setItem('username', name);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUserId(null);
    setUserLevel(null);
    setUsername(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('userLevel');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    window.location.href = '/';
  };

  return (
    <UserContext.Provider value={{ userId, userLevel, username, token, setUserId, setUserLevel, setUsername, setToken, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
