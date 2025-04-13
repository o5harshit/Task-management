import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true }
}, {
  timestamps: true,
});

const TaskModel =  mongoose.model("Task", taskSchema);


export default TaskModel;
