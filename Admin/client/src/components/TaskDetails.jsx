import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api-client";
import { COMMENT_ROUTES } from "@/utils/constants";
import TaskComments from "@/Pages/TaskComments";

const TaskDetails = () => {
  const { taskId } = useParams();
  console.log(taskId);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await apiClient.get(`${COMMENT_ROUTES}/project/${taskId}/comment`);
        console.log(res);
        setComments(res.data || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [taskId]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : (
        <TaskComments comments={comments} loading={loading} setLoading={setLoading} setComments={setComments} />
      )}
    </div>
  );
};

export default TaskDetails;
