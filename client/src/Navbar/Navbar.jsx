import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { logout } from "@/redux/slices/authSlice";
import { LOGOUT_USER } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  console.log(user);


  const handleLogout = async () => {
    const response = await apiClient.get(LOGOUT_USER,{ withCredentials: true });
    if(response.data.success){
      dispatch(logout());
      toast.success("User has been Logout");
      navigate("/auth");
    } else{
      toast.error("You are not been logout!Try Again");
    }
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">

      <div
        className="text-xl md:text-2xl font-bold text-purple-700 cursor-pointer"
      >
        TaskFlow
      </div>
      <div>
        {user ? (
        <Button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
        >
          Logout
        </Button>
      ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
