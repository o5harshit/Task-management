import React, { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import {  PROJECT_ROUTES } from "@/utils/constants";
import TaskList from "@/Pages/TaskList";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const [tasks, setTasks] = useState([]);
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // eslint-disable-next-line no-undef
        const res = await apiClient.get(`${PROJECT_ROUTES}/projects/${projectId}/task`);
        setTasks(res.data.tasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-purple-600" />
      </div>
    );
  }

  return <TaskList tasks={tasks} />;
};

export default ProjectDetails;
