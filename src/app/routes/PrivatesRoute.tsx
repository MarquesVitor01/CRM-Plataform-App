import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";

interface PrivateRouteProps {
    element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const { user, loading } = useAuth();

    if (loading) return  <div className="circle-loading">
    <CircularProgress color="inherit" className="circle"/>
   </div>;

    return user ? element : <Navigate to="/" />;
};

export default PrivateRoute;
