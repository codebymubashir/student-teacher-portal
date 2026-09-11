import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUser } from '../Backend/auth';

const ProtectedRoute = ({ allowedRoles }) => {
  const user = getUser();

  // 1. If not logged in, send to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. If user's role is not allowed for this route, send to dashboard home or access-denied
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/portal/home" replace />;
  }

  // 3. If authenticated & authorized, render child routes
  return <Outlet />;
};

export default ProtectedRoute;