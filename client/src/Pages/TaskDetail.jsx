import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "@/lib/api-client";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PROJECT_ROUTES } from "@/utils/constants";

const TaskDetail = () => {
  const { taskId } = useParams(); // assuming route like /tasks/:taskId
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await apiClient.get(`${PROJECT_ROUTES}/task/${taskId}/statusUpdate`, { withCredentials: true });
        console.log("Task fetched:", res.data);
        if (res.data && res.data.task) {
          setTask(res.data.task);
        } else {
          console.warn("No task found in response.");
        }
  
      } catch (err) {
        console.error("Failed to load task:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTask();
  }, []);
  
    const handleStatusChange = async (newStatus) => {
    setStatusUpdating(true);
    try {
        const res = await apiClient.post(`${PROJECT_ROUTES}/task/${taskId}/statusUpdate`, { status: newStatus }, { withCredentials: true });
      setTask(res.data.task); // update local task
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setStatusUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin h-10 w-10 text-purple-600" />
      </div>
    );
  }

  if (!task) {
    return <div className="text-center text-red-500">Task not found.</div>;
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-purple-100 via-white to-pink-100">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Task Details</h1>

      <Card className="max-w-xl mx-auto p-6 rounded-xl shadow-md bg-white">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-semibold text-purple-800">{task.title}</h2>
          <p className="text-gray-700">{task.description || "No description available."}</p>

          <div className="flex items-center gap-2">
            <span className="text-purple-600 font-semibold">Status:</span>
            <Badge className="capitalize">{task.status}</Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-purple-600 font-semibold">Priority:</span>
            <Badge
              className={`capitalize ${
                task.priority === "high"
                  ? "bg-red-200 text-red-700"
                  : task.priority === "medium"
                  ? "bg-yellow-200 text-yellow-700"
                  : "bg-green-200 text-green-700"
              }`}
            >
              {task.priority}
            </Badge>
          </div>

          <div className="text-sm text-gray-500">
            Created At: {new Date(task.createdAt).toLocaleString()}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button disabled={statusUpdating} variant="outline">
                {statusUpdating ? "Updating..." : "Change Status"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["todo", "in-progress", "done"].map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => handleStatusChange(option)}
                  className="capitalize"
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetail;
