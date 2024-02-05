import mongoose from "mongoose";
import Admin from "../Models/AdminModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import dotenv from 'dotenv'
dotenv.config()
class AdminController {
  static createAdmin = async (req, res) => {
    const { username, password, roles } = req.body;

    try {
      // Check if the username already exists
      const existingAdmin = await Admin.findOne({ username });

      if (existingAdmin) {
        // If the username already exists, return an error response
        return res.status(400).json({ error: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // If the username is unique, create the new admin
      const admin = await Admin.create({
        username,
        password: hashedPassword,
        roles,
      });

      res.status(200).json(admin);
    } catch (error) {
      // Handle other errors
      res
        .status(500)
        .json({ error: "Internal Server Error", err: error.message });
    }
  };

  static readAdmin = async (req, res) => {
    try {
      const admin = await Admin.find().populate("roles");
      res.status(200).json(admin);
    } catch (error) {
      res.status(400).json({ error: { ...error } });
    }
  };

  static readOneAdmin = async (req, res) => {
    const { id } = req.params;

    try {
      // Check if the provided id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(400)
          .json({ error: "Invalid ObjectId format", providedId: id });
      }

      const admin = await Admin.findById(id).populate("roles");

      // Check if the admin with the given ID exists
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      res.status(200).json(admin);
    } catch (error) {
      // Handle other errors
      console.error("Error in readOneAdmin:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { username, password, roles } = req.body;

    try {
      const updateFields = {
        username,
        roles,
      };

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateFields.password = hashedPassword;
      }

      const admin = await Admin.findByIdAndUpdate(id, updateFields, {
        new: true,
      });

      res.status(200).json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  static deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
      await Admin.findByIdAndDelete(id);
      res.status(200).json({ message: "Admin deleted succefully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  static login = async (req, res) => {
    const { username, password } = req.body;

    try {
      // Find user by email
      const admin = await Admin.findOne({ username }).populate('roles');

      // Check if the user exists and the password is correct
      if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Sign and generate a JWT token
      const token = jwt.sign(
        { id: admin._id, name: admin.username, roles: admin.roles },
        process.env.SECRET_STRING,
        { expiresIn: "24h" }
      );

      // Set token in HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
      });

      // Respond with success message and token
      return res
        .status(200)
        .json({ status: 200, message: "Login successful", token });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ message: "Internal Server Error", err:err.message });
    }
  };

  static logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "logged out successfully" });
  };
}
export default AdminController;
