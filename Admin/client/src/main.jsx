import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Login from "./Login/Login";
import { store } from "./redux/store";
import { Provider} from "react-redux";
import Sidebar from "./Sidebar/Sidebar";
import Add from "./Pages/Add";
import AddTask from "./Pages/AddTask";
import ProjectsPage from "./components/ProjectsPage";
import ProjectDetails from "./components/ProjectDetails";
import UserTasksSplit from "./components/UserTasksSplit";
import { PrivateRoute } from "./lib/PrivateRoute";
import { ProtectedAuthRoute } from "./lib/ProtectedAuthRoute";
import TaskDetails from "./components/TaskDetails";

const browseRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <ProtectedAuthRoute><Login /></ProtectedAuthRoute>,
  },

  {
    path: "projects/:projectId/add-task", // ✅ Dynamic route
    element: (
        <AddTask />
    ), // <-- Your task creation page
  },
  {
    path: "/projects/:projectId/task", // ✅ Dynamic route
    element: (
        <ProjectDetails />
    ), // <-- Your task creation page
  },

  {
    path: "admin-dashboard",
    element: (
        <App />
    ),
  },
  {
    path : "/projects/:taskId/task/comments",
    element : <TaskDetails/>
  },

  // ✅ Main layout routes (Sidebar + App)
  {
    path: "/",
    element: <App />, // App should include <Sidebar /> and <Outlet />
    children: [
      {
        path: "AllProjects",
        element: (
          <PrivateRoute>
            <ProjectsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "AddProject",
        element: (
          <PrivateRoute>
            <Add />
          </PrivateRoute>
        ),
      },
      {
        path: "AllMembers",
        element: (
          <PrivateRoute>
            <UserTasksSplit />
          </PrivateRoute>
        ),
      },
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "*",
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={browseRoutes} />
      <Toaster closeButton />
    </Provider>
  </StrictMode>
);
