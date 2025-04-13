import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { apiClient } from './lib/api-client';
import { loginSuccess, logout } from './redux/slices/authSlice';
import { useEffect, useState } from 'react';
import { GET_USER_INFO } from './utils/constants';
import Sidebar from './Sidebar/Sidebar';



function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const getUserData = async () => {
      try {
        console.log("hii");
        const response = await apiClient.get(GET_USER_INFO, { withCredentials: true });
        console.log("User Info:", response.data);
        if (response.data.success) {
          dispatch(loginSuccess(response.data.message)); // Assuming `message` = user object
        } else {
          dispatch(logout()); // properly reset auth
        }
      } catch (e) {
        console.log(e);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [dispatch, userInfo]);
  if(loading){
    return (<div>Loading...</div>)
  }
  return (
    <>
     <Navbar/>
    <div className='flex'>
     <Sidebar/>
     <Outlet/>
     </div>
    </>
  )
}

export default App
