import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { useNavigate } from "react-router-dom";
import { CREATE_PROJECT } from "@/utils/constants";

const Add = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleCreateProject = async () => {
    if (!name) {
      toast.error("Project name is required");
      return;
    }

    try {
      const response = await apiClient.post(CREATE_PROJECT, {
        name,
        description,
      });

      toast.success("Project created successfully");
      const projectId = response.data.project._id;
      console.log(projectId);
      navigate(`/projects/${projectId}/add-task`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create project");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4 py-10">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-semibold mb-8 text-red-600 text-center">
          Add Project
        </h2>

        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <Input
              placeholder="Type here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Description
            </label>
            <Textarea
              placeholder="Write Content Here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none h-32"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleCreateProject}
            className="bg-black text-white px-10 py-2"
          >
            ADD
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Add;
