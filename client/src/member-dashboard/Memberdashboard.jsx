import React from 'react'
import { useSelector } from 'react-redux';

const Memberdashboard = () => {
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log(user);
    console.log(isAuthenticated);
  return (
    <></>
  )
}

export default Memberdashboard;