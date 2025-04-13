import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  comment : [
    {
      type : Schema.Types.ObjectId,
      ref : "Comment"
    }
  ],
  isAdmin : {
    type : String,
    default : false
  }
});

UserSchema.pre("save", async function name(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
