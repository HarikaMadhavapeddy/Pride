import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({children}) {
    const {user}=useSelector(state=>state.shoppingAuth);
    console.log(user);
    if(!user){
        return <Navigate to='/login' replace/>
    }
  return children;
}
