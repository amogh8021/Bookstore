import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");  
  if (!token) {
    // agar token nahi hai to login pe redirect
    return <Navigate to="/login" />;
  }
  // agar token hai to jo child pass hua hai usko render karo
  return children;
};

export default PrivateRoute;
