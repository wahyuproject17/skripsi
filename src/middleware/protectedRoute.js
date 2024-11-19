import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../pages/UserContext'; // Pastikan pathnya benar

const ProtectedRoute = ({ component: Component, requiredLevel, ...rest }) => {
  const { userLevel } = useUser();
  const token = localStorage.getItem('token');
  
  // Logic untuk memeriksa autentikasi dan level pengguna
  if (token && userLevel == requiredLevel) {
    return <Component {...rest} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
