import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function TaskList({ tasks }) {
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3);
  });
  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-700 mb-8">
          Tasks for this Project 📋
        </h1>

        <ScrollArea className="h-[75vh] rounded-xl border border-purple-300 shadow-md p-4 bg-white">
          <div className="space-y-6">
            {sortedTasks.length === 0  ? (
              <p className="text-center text-gray-500">No tasks available.</p>
            ) : (
              sortedTasks.map((task, index) => (
                <motion.div
                  key={task._id || index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border border-purple-200 bg-white shadow-md rounded-xl hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg sm:text-xl font-semibold text-purple-800">
                          🟣 {task.title}
                        </h2>
                        <Badge
                          className={`capitalize ${
                            task.priority === "high"
                              ? "bg-red-200 text-red-700"
                              : task.priority === "medium"
                              ? "bg-yellow-200 text-yellow-700"
                              : "bg-green-200 text-green-700"
                          }`}
                        >
                          {task.priority || "low"}
                        </Badge>
                      </div>

                      <p className="text-gray-600 text-sm">
                        {task.description || "No description provided."}
                      </p>

                      <div className="flex justify-between text-sm text-gray-500 pt-2">
                        <span>
                          Assigned to:{" "}
                          <span className="font-medium text-purple-600">
                            {task.assignedTo?.name || "Unassigned"}
                          </span>
                        </span>
                        <span>
                          Status: <span className="capitalize">{task.status || "Pending"}</span>
                        </span>
                      </div>

                      {/* ✅ Add Comment Button */}
                      <div className="pt-2">
                        <Link to={`/projects/${task._id}/task/comments`}>
                        <Button variant="outline" className="text-purple-700 border-purple-300 hover:bg-purple-100 cursor-pointer">
                          💬 Comment
                        </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
