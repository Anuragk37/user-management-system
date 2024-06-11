import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';



export function UserReverseRoute({ children }) {
   const isAuthenticated = useSelector((state)=>state.auth.isUserAuthenticated)
  const navigate = useNavigate();

  useEffect(()=>{
   if (isAuthenticated) {
      navigate("/user-home");
    }
  },[isAuthenticated])

  return children;
}