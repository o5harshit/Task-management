import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function MyProjectGrid({ projects }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-white to-pink-100 px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-12 text-purple-700">
        My Projects
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
          >
            <Card className="h-full flex flex-col justify-between p-6 rounded-2xl shadow-md bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="flex flex-col h-full space-y-4 p-0">
                <div>
                  <h2 className="text-xl font-semibold text-purple-800 capitalize mb-2">
                    {project?.project?.name}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 min-h-[60px]">
                    {project?.description || "No description provided."}
                  </p>
                  <p className="text-gray-600 font-bold line-clamp-3 min-h-[20px]">
                    {" "}
                    Project-Status :{" "}
                    {project?.status.toUpperCase() ||
                      "No description provided."}
                  </p>
                </div>

                <div className="space-y-2 mt-2">
                  <p className="font-medium text-purple-700">Tasks-priority:</p>
                  <div className="flex justify-between items-center text-sm text-gray-700">
                    <Badge
                      className={`text-xs px-2 py-1 rounded-full ${
                        project.priority === "high"
                          ? "bg-red-200 text-red-700"
                          : project.priority === "medium"
                          ? "bg-yellow-200 text-yellow-700"
                          : "bg-green-200 text-green-700"
                      }`}
                    >
                      {project?.priority || "low"}
                    </Badge>
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-3">
                  <Badge
                    variant="outline"
                    className="w-fit text-xs text-purple-700 border-purple-400"
                  >
                    Created{" "}
                    {project?.createdAt
                      ? new Date(project.createdAt).toLocaleDateString()
                      : "Unknown date"}
                  </Badge>
                </div>
                <Link to={`/task/${project._id}/statusUpdate`}>
                  <Button className="cursor-pointer" variant="outline">
                    Change Task Status
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default MyProjectGrid;
