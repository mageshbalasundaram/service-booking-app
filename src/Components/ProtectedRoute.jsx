

import React from 'react'
import { useAuth } from '../Context/AuthContext';
import {Navigate} from "react-router-dom";

const ProtectedRoute = ( {children, allowedRole}) => {

    const { user, role, loading} = useAuth();

    if(loading) return <p>Loading</p>;

    if(!user){
        return <Navigate to="/login"/>
    }

    if( allowedRole && role !== allowedRole){
        return <Navigate to="/login" />;
    }

  return children;
}

export default ProtectedRoute