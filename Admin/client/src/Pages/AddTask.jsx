import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { GET_USERS, PROJECT_ROUTES } from "@/utils/constants";

const AddTask = () => {
  const { projectId } = useParams();
  const naviagte = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);
    useEffect(() => {
      const fetchUsers = async () => {
        const res = await apiClient.get(GET_USERS);
        console.log(GET_USERS);
        console.log(res);
        setUsers(res.data);
      };
  
      fetchUsers();
    }, []);

   

  const handleAddTask = async () => {
    if (!title || !assignedTo) {
      return toast.error("Title and Assigned User are required");
    }

    try {
      const response = await apiClient.post(`${PROJECT_ROUTES}/projects/${projectId}/tasks`, {
        title,
        description,
        priority,
        assignedTo,
      });


      toast.success("Task added!");
      setTitle("");
      setDescription("");
      setPriority("medium");
      setAssignedTo("");
      naviagte("/AllProjects");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add task");
    }
  };

  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(circle,_black_1px,_transparent_1px)] [background-size:24px_24px] flex items-center justify-center ">
   <div className="max-w-2xl mx-auto mt-12 p-8 rounded-2xl bg-gradient-to-br from-purple-100 via-white to-purple-50 shadow-2xl transition-all duration-500 ease-in-out hover:shadow-purple-300 animate-in fade-in slide-in-from-bottom-6">
  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500 text-center mb-6">
    Add Task to Project
  </h2>

  <div className="space-y-4">
    <Input
      placeholder="Task Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="transition-all duration-300 focus:ring-2 focus:ring-purple-400"
    />

    <Textarea
      placeholder="Task Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="transition-all duration-300 focus:ring-2 focus:ring-purple-400"
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Select value={priority} onValueChange={setPriority}>
        <SelectTrigger className="focus:ring-purple-400">Priority: {priority}</SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>

      <Select value={assignedTo} onValueChange={setAssignedTo}>
        <SelectTrigger className="focus:ring-purple-400">Assign To</SelectTrigger>
        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user._id} value={user._id}>
              {user.name} ({user.email})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <Button
      onClick={handleAddTask}
      className="w-full mt-4 bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white hover:brightness-110 hover:scale-[1.01] transition-all duration-300 shadow-lg shadow-purple-200"
    >
      Add Task
    </Button>
  </div>
</div>
</div>
  );
};

export default AddTask;
