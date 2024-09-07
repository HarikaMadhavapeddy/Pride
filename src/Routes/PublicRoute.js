import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const user = useSelector((state) => state.shoppingAuth.user);
  if (user) {
    return <Navigate to="/products" replace />;
  }
  return children;
}
