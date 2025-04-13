import AdminModel from "../Models/AdminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.json({
        success: false,
        message: "Email and Password Required",
      });
    }
    const user = await AdminModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message:
          "User with the Email and Password Dont exist create your account first",
      });
    }
    const auth = await bcrypt.compare(user.password, password);
    res.cookie("token", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.json({
      success: true,
      message: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};

export const AdminInfo = async (req, res) => {
  try {
    console.log(req.userId);
    const user = await AdminModel.findById(req.userId);
    console.log(user);
    if (!user) {
      res.json({ success: false, message: "User with given id not found" });
    }
    res.json({
      success: true,
      message: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};


export const Logout = async (req,res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
