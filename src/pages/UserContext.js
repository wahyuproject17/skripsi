import React, { createContext, useState, useContext, useEffect } from 'react';

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

  useEffect(() => {
    if (userId !== null) {
      localStorage.setItem('userId', userId);
    }
    if (userLevel !== null) {
      localStorage.setItem('userLevel', userLevel.toString());
    }
    if (username !== null) {
      localStorage.setItem('username', username);
    }
  }, [userId, userLevel, username]);

  const login = (id, level, name) => {
    setUserId(id);
    setUserLevel(level);
    setUsername(name);
    localStorage.setItem('userId', id);
    localStorage.setItem('userLevel', level.toString());
    localStorage.setItem('username', name);
  };

  const logout = () => {
    setUserId(null);
    setUserLevel(null);
    setUsername(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('userLevel');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <UserContext.Provider value={{ userId, userLevel, username, setUserId, setUserLevel, setUsername, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
