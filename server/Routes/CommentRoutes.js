import express from "express"
import { addComment, getTaskComments } from "../Controllers/CommentControllers.js";
import { verifyToken } from "../Middlewares/AuthMiddleware.js";
import { AdminMiddleware } from "../Middlewares/AdminMiddleware.js";


const CommentRoutes = express.Router();

CommentRoutes.get("/project/:taskId/comment",getTaskComments);
CommentRoutes.post("/project/:taskId/comments",verifyToken,addComment);
CommentRoutes.post("/project/:taskId/Admin-comments",AdminMiddleware,addComment);

export default CommentRoutes;