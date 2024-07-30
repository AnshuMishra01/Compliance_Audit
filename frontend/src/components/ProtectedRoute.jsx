import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getUserType } from '../utils/auth';

const ProtectedRoute = ({ children, userType }) => {
  const location = useLocation();

  if (!isAuthenticated() || getUserType() !== userType) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;