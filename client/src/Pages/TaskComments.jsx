import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { COMMENT_ROUTES } from "@/utils/constants";
import axios from "axios";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { apiClient } from "@/lib/api-client";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: "spring",
    },
  }),
};

const TaskComments = ({ comments = [], loading,setComments, setLoading }) => {
  const [showForm, setShowForm] = useState(false);
  const { taskId } = useParams();
  const [newComment, setNewComment] = useState("");

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

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    console.log("Submitting:", newComment);
    try {
      setLoading(true);
      const response = await axios.post(
        `${COMMENT_ROUTES}/project/${taskId}/comments`, // ✅ your taskId or projectId from route
        { content: newComment },
        { withCredentials: true }
      );
      console.log(response);
      setNewComment("");
      setShowForm(false);
    } catch (err) {
      console.error("Error adding comment:", err);
      toast.error("Failed to add comment.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6 max-w-3xl mx-auto min-h-[50vh]">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-transparent bg-clip-text">
        💬 Task Comments
      </h2>

      <ScrollArea className="h-[65vh] rounded-xl border border-purple-300 shadow-sm bg-white p-4">
        <div className="space-y-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-center text-gray-500">No comments yet.</p>
          ) : (
            comments.map((comment, i) => (
              <motion.div
                key={comment._id || i}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <Card className="bg-gradient-to-tr from-white via-indigo-50 to-purple-50 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl">
                  <CardContent className="p-4 flex gap-4 items-start">
                    <Avatar>
                      <AvatarImage
                        src={comment.author?.avatar || ""}
                        alt={comment.author?.name || "User"}
                      />
                      <AvatarFallback>
                        {comment.author?.name?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h4 className="font-semibold text-purple-700">
                        {comment.author?.name || "Admin"}
                      </h4>
                      <p className="text-gray-700 text-sm">{comment.content}</p>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </ScrollArea>
      <div className="flex justify-center mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "➕ Add your comment"}
        </motion.button>
      </div>
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mt-6 space-y-3"
          >
            <Input
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full border-purple-300 focus:ring-purple-400"
            />
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 transition-colors"
              onClick={handleAddComment}
            >
              Submit Comment
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskComments;
