import express from "express"
import { verifyToken } from "../Middlewares/AuthMiddleware.js";
import { AdminInfo, AdminLogin, Logout } from "../Controllers/AdminController.js";


const AdminRoutes = express.Router();


AdminRoutes.post("/adminLogin",AdminLogin);
AdminRoutes.get("/Admin-info",verifyToken,AdminInfo);
AdminRoutes.get("/logout",Logout);

export default AdminRoutes;

