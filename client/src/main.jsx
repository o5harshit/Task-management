import { StrictMode} from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Auth from "./auth/Auth";
import { Toaster } from "./components/ui/sonner";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Memberdashboard from "./member-dashboard/memberdashboard";
import ProjectsPage from "./components/ProjectsPage";
import ProjectDetails from "./components/ProjectDetails";
import TaskDetails from "./components/TaskDetails";
import MyProjects from "./components/MyProjects";
import TaskList from "./Pages/TaskList";
import TaskDetail from "./Pages/TaskDetail";
import { ProtectedRoute } from "./lib/ProtectedRoute";

const BrowseRouter = createBrowserRouter([
  
  {
    path: "/auth", // no need for slash
    element: <Auth />,
  },
  {
    path : "/projects/:projectId/task",
    element : <ProjectDetails/>
  },
  {
    path : "/projects/:taskId/task/comments",
    element : <TaskDetails/>
  },
  {
    path : "/task/:taskId/statusUpdate",
    element : <TaskDetail/>
  },
  {
    path: "/",
    element: <App />, // App has Navbar and <Outlet />
    children: [
      {
        path: "/member-dashboard",
        element: <ProtectedRoute><Memberdashboard/></ProtectedRoute>
      },
      {
        path : "/AllProjects",
        element : <ProtectedRoute><ProjectsPage/></ProtectedRoute>
      },
      {
        path : "/MyProjects",
        element : <ProtectedRoute><MyProjects/></ProtectedRoute>
      },
      {
        path: "/",
        element: <Navigate to="/auth" replace />,
      },
      {
        path: "*",
        element: <Navigate to="/auth" replace />,
      },
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={BrowseRouter} />
      <Toaster closeButton />
    </Provider>
  </StrictMode>
);
