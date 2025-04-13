import express from "express"
import { getUserInfo, GetUsers, login, Logout, signup} from "../Controllers/AuthControllers.js";
import { verifyToken } from "../Middlewares/AuthMiddleware.js";





const AuthRoutes = express.Router();

AuthRoutes.post("/signup",signup);
AuthRoutes.get("/user-info",verifyToken,getUserInfo);
AuthRoutes.post("/login",login);
AuthRoutes.get("/user",GetUsers);
AuthRoutes.get("/logout",Logout);



export default AuthRoutes;


