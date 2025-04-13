import ProjectModel from "../Models/ProjectModel.js";
import TaskModel from "../Models/TaskModel.js";
import UserModel from "../Models/UserModel.js";

export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Basic validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }

    const newProject = new ProjectModel({
      name,
      description,
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating project",
    });
  }
};


export const addTaskToProject = async (req, res) => {
  const { projectId } = req.params;
  console.log(req.body,projectId);
  const { title, description, priority, assignedTo } = req.body;

  try {
    // ✅ Validate project
    const project = await ProjectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // ✅ Validate assigned user
    const user = await UserModel.findById(assignedTo);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Assigned user not found",
      });
    }

    // ✅ Create new task
    const task = new TaskModel({
      title,
      description,
      priority,
      assignedTo,
      project: projectId,
    });

    await task.save();

    console.log(task._id);

    project.tasks.push(task._id);
    await project.save();

    // ✅ Optional: Add project to user’s assigned projects if not already added
    if (!user.tasks.includes(task._id)) {
      user.tasks.push(task._id);
      await user.save();
    }

    res.status(201).json({
      success: true,
      message: "Task created and assigned successfully",
      task,
    });
  } catch (err) {
    console.error("Error creating task:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while creating task",
    });
  }
};


export const getProjects = async(req,res) => {
  try {
    const projects = await ProjectModel.find(); // Fetch all projects
    res.status(200).json(projects); // Send to frontend
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
}

export const getTasks = async(req,res) => {
  const { projectId } = req.params;

  try {
    const project = await ProjectModel.findById(projectId)
      .populate({
        path: "tasks",
        populate: {
          path: "assignedTo",
          select: "name", // only get the name of the user
        },
      });
  
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
  
    res.status(200).json({
      tasks: project.tasks,
    });
  } catch (error) {
    console.error("Error fetching project tasks:", error);
    res.status(500).json({ message: "Server error" });
  }

}


export const getUserWithProjects = async(req,res) => {
  try {
    // Users with at least one project
    const usersWithProjects = await UserModel.find({
      tasks: { $exists: true, $not: { $size: 0 } },
    });

    // Users with no projects
    const usersWithoutProjects = await UserModel.find({
      $or: [
        { tasks: { $exists: false } },
        { tasks: { $size: 0 } },
      ],
    });

    res.status(200).json({
      usersWithProjects,
      usersWithoutProjects,
    });
  } catch (error) {
    console.error("Error fetching users by project status:", error);
    res.status(500).json({ message: "Server error" });
  }
}


export const getAssignedTasksWithProjects = async (req, res) => {
  try {
    const userId = req.userId; // assuming this comes from auth middleware

    // Fetch tasks assigned to the user and populate related project info
    const tasks = await TaskModel.find({ assignedTo: userId })
      .populate({
        path: "project",
        select: "name description createdAt",
      })
      .populate({
        path: "assignedTo",
        select: "name email", // optional: includes user info (self)
      });

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching assigned tasks with project details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch assigned tasks.",
      error: error.message,
    });
  }
};

export const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task status updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getTask = async(req,res) =>{
  try {
    const {taskId} = req.params;

    console.log(taskId);

    const task = await TaskModel.findById(taskId).populate('project'); // populate if needed

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ task });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Server error' });
  }
}



