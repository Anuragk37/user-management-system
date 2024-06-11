import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';



export function AdminReverseRoute({ children }) {
   const isAuthenticated = useSelector((state)=>state.auth.isAdminAuthenticated)
  const navigate = useNavigate();

  useEffect(()=>{
   if (isAuthenticated) {
      navigate("/admin-home");
    }
  },[isAuthenticated])

  return children;
}