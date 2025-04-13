import React, { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import Section from "@/Pages/Section";
import { GET_ALL_USER_PROJECTS } from "@/utils/constants";
import { Loader2 } from "lucide-react";

const UserTasksSplit = () => {
  const [users, setUsers] = useState({
    usersWithProjects: [],
    usersWithoutProjects: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiClient.get(GET_ALL_USER_PROJECTS);
        console.log(res.data);
        const { usersWithProjects, usersWithoutProjects
        } = res.data;
        setUsers({ usersWithProjects, usersWithoutProjects });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch users", err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-purple-600" />
      </div>
    );
  }
  return (
    <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
        User Task Assignment Overview
      </h1>

      <Section
        title="✅ Users Assigned Tasks"
        users={users.usersWithProjects}
        gradient="from-green-400 via-green-500 to-green-600"
      />

      <Section
        title="❌ Users Not Assigned Any Tasks"
        users={users.usersWithoutProjects}
        gradient="from-red-400 via-pink-500 to-red-600"
      />
    </div>
  );
};

export default UserTasksSplit;
