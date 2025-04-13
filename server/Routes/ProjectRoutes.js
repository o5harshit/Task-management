import express from "express";
import { addTaskToProject, createProject, getProjects, getTasks, getUserWithProjects,getAssignedTasksWithProjects, updateTaskStatus, getTask } from "../Controllers/ProjectController.js";
import { verifyToken } from "../Middlewares/AuthMiddleware.js";

const ProjectRoutes = express.Router();

ProjectRoutes.post("/create", createProject);
ProjectRoutes.post("/projects/:projectId/tasks",addTaskToProject);
ProjectRoutes.get("/allprojects",getProjects);
ProjectRoutes.get("/projects/:projectId/task",getTasks);
ProjectRoutes.get("/userProjects",getUserWithProjects);
ProjectRoutes.get("/Assigntome",verifyToken,getAssignedTasksWithProjects);
ProjectRoutes.post("/task/:taskId/statusUpdate",updateTaskStatus);
ProjectRoutes.get(`/task/:taskId/statusUpdate`,getTask);
export default ProjectRoutes;
