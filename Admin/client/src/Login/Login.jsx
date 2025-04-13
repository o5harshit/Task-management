import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/api-client";
import { ADMIN_LOGIN_ROUTE } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { setAdmin } from "@/redux/slice/adminAuthSlice";
import { Button } from "@/components/ui/button";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      const response = await apiClient.post(
        ADMIN_LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.success) {
            toast.success("Welcome Admin!");
            dispatch(setAdmin(response.data.message)); 
            navigate("/admin-dashboard");
        } else{
            toast.error("You are not the Admin");
        }
    } catch (error) {
        console.log(error);
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white shadow-2xl rounded-3xl px-10 py-12 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Admin Login
        </h2>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="rounded-lg px-5 py-4"
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="rounded-lg px-5 py-4"
          />
          <Button
            onClick={handleLogin}
            className="mt-4 w-full rounded-lg bg-purple-600 hover:bg-purple-700 text-white"
          >
            Login
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
