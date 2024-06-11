import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';



export function AdminPrivateRoute({ children }) {
   const isAuthenticated = useSelector((state)=>state.auth.isAdminAuthenticated)
  const navigate = useNavigate();

  useEffect(()=>{
   if (!isAuthenticated) {
      navigate("/admin-login");
    }
  },[isAuthenticated])

  return children;
}
