import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
}, {
  timestamps: true,
});

 const ProjectModel =  mongoose.model("Project", projectSchema);

 export default ProjectModel;