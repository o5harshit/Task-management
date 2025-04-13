import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      type: "spring",
    },
  }),
};

const Section = ({ title, users, gradient, loading }) => {
  const isValidArray = Array.isArray(users) && users.length > 0;

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array(3)
            .fill()
            .map((_, i) => <Skeleton key={i} className="h-40 rounded-2xl" />)
        ) : isValidArray ? (
          users.map((user, i) => (
            <motion.div
              key={user._id || i}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              <Card
                className={`rounded-2xl shadow-lg border-none bg-gradient-to-tr ${gradient} text-white transition-all duration-300 hover:scale-[1.02]`}
              >
                <CardContent className="p-6 space-y-2">
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <p className="text-sm">{user.email}</p>
                  <p className="text-sm opacity-90">
                    Tasks Assigned:{" "}
                    <span className="font-medium">{user.tasks?.length || 0}</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-gray-500 col-span-full text-center py-10">
            No users found in this section.
          </div>
        )}
      </div>
    </div>
  );
};

export default Section;
