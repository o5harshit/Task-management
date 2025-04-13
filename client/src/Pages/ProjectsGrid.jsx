import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProjectsGrid({ projects }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-pink-100 px-6 py-10 flex-1">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-purple-700">
          All Projects
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            >
              <Card className="h-full flex flex-col justify-between p-6 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300">
                <CardContent className="flex flex-col h-full space-y-4 p-0">
                  <div>
                    <h2 className="text-xl font-semibold text-purple-800 capitalize mb-2">
                      {project.name}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3 min-h-[60px]">
                      {project.description || "No description provided."}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-col gap-4">
                    <Badge variant="outline" className="w-fit text-xs text-purple-700 border-purple-400">
                      Created {new Date(project.createdAt).toLocaleDateString()}
                    </Badge>
                    <Link to={`/projects/${project._id}/task`}>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white transition rounded-xl">
                      View Tasks
                    </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
