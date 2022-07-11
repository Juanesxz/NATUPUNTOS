import React from "react";
import { useAuth } from "../context/authContext";
import { Redirect } from "react-router-dom";
export function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <h3>Loading...</h3>;




    if (user.role === null) return <Redirect to="/user-pages/login" />;






    return children;
}
