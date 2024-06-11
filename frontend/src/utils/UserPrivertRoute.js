import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';



export function UserPrivateRoute({ children }) {
   const isAuthenticated = useSelector((state)=>state.auth.isUserAuthenticated)
  const navigate = useNavigate();

  useEffect(()=>{
   if (!isAuthenticated) {
      navigate("/signin");
    }
  },[isAuthenticated])

  return children;
}
