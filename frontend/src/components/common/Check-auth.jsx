import { Navigate, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import React from 'react';

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);
  console.log("Current Path:", location.pathname);

  // Redirect authenticated users away from login/signup pages
  if (isAuthenticated && (location.pathname === "/authen/login" || location.pathname === "/authen/signup")) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/profile-admin" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // Redirect unauthenticated users from protected routes
  if (!isAuthenticated && (location.pathname.startsWith("/user") || location.pathname.startsWith("/admin"))) {
    return <Navigate to="/authen/login" replace />;
  }

  // Restrict non-admin users from admin routes
  if (isAuthenticated && user?.role !== "admin" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/authen/login" replace />;
  }

  // Restrict admin users from user routes
  if (isAuthenticated && user?.role === "admin" && location.pathname.startsWith("/user")) {
    return <Navigate to="/admin/profile-admin" replace />;
  }

  if (!isAuthenticated || (user?.role !== "admin" && user?.role !== "user" && location.pathname.startsWith("/messages"))) {
    return <Navigate to="/authen/login" />;
}

  // Allow access to the requested route
  return <>{children}</>;
}


export default CheckAuth;