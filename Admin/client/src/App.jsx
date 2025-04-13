import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { apiClient } from './lib/api-client';
import { GET_USER_INFO } from './utils/constants';
import { clearAdmin, setAdmin } from './redux/slice/adminAuthSlice';
import Sidebar from './Sidebar/Sidebar';
import RouteTracker from './lib/RouteTracker';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const  userInfo = useSelector((state) => state.adminAuth.admin);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, { withCredentials: true });
        console.log("User Info:", response.data);

        if (response.data.success) {
            dispatch(setAdmin(response.data.message));
             // Assuming `message` = user object
        } else {
            dispatch(clearAdmin()); // properly reset auth
        }
      } catch (e) {
        console.log(e);
        dispatch(clearAdmin());
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
    <RouteTracker />
    </div>
    </>
  )
}

export default App
