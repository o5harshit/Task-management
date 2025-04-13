import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { GET_ALL_MY_PROJECTS} from "@/utils/constants";
import MyprojectGrid from "@/Pages/MyprojectGrid";

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await apiClient.get(GET_ALL_MY_PROJECTS,{withCredentials : true});
        console.log(res);
        setProjects(Array.isArray(res.data.tasks) ? res.data.tasks : []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-purple-600" />
      </div>
    );
  }

  return <MyprojectGrid projects={projects} />;
};

export default MyProjects;
