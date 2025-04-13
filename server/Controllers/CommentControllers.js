import AdminModel from "../Models/AdminModel.js";
import CommentModel from "../Models/CommentModel.js";
import TaskModel from "../Models/TaskModel.js";
import UserModel from "../Models/UserModel.js";



export const getTaskComments = async (req, res) => {
    const { taskId } = req.params;
    try {
      const comments = await CommentModel.find({ task: taskId })
        .populate("author", "name email") // populate only name & email of the author
        .sort({ createdAt: -1 }); // Optional: latest comments first
  
      return res.status(200).json(comments);
    } catch (error) {
      console.error("Error fetching task comments:", error);
      return res.status(500).json({ message: "Failed to fetch comments" });
    }
  };


  export const addComment = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { content } = req.body;
  
      // Ensure the task exists
      const task = await TaskModel.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      // Create the comment
      const comment = new CommentModel({
        content,
        task,
        author: req.userId,  // Use the userId to link the comment
      });
  
      // Save the comment
      await comment.save();
  
      // Find the user or admin (depending on the userId)
      let account;
      let isAdmin = false;
  
      // First check if it's an admin
      account = await AdminModel.findById(req.userId);
      if (account) {
        isAdmin = true;
      } else {
        // Otherwise, it's a regular user
        account = await UserModel.findById(req.userId);
        if (!account) {
          return res.status(404).json({ message: "User not found" });
        }
      }
  
      // Push comment ID to the correct model (either admin or user)
      account.comment = account.comment || [];  // Ensure it's an array
      account.comment.push(comment._id);
      await account.save();
  
      console.log(account);
  
      // Populate the author to get the name and send it to the frontend
      await comment.populate("author", "name email");  // Populate the name of the author
  
      // If author is null (admin), set the name to "Admin"
      const authorName = comment.author ? comment.author.name : "Admin";
      console.log("the author name is",authorName);
      // Return the response with the comment and author's name
      res.status(201).json({
        message: "Comment added",
        comment: {
          content: comment.content,
          task: comment.task,
          author: authorName,  // Send the correct author's name
        },
      });
    } catch (error) {
      console.error("Error saving comment:", error);
      res.status(500).json({ message: "Failed to save comment" });
    }
  };
  