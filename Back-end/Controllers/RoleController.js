import mongoose from "mongoose";
import Role from "../Models/RoleModel.js";

class RoleController {
  static createRole = async (req, res) => {
    const { name } = req.body;

    try {
      const role = await Role.create({
        name,
      });
      res.status(200).json(role);
    } catch (error) {
      res.status(400).json({ ...error });
    }
  };

  static readRole = async (req, res) => {
    try {
      const role = await Role.find();
      if (role.length === 0) {
        res.status(404).json({ message: "No Role in The Database" });
      }

      res.status(200).json(role);
    } catch (error) {
      res.status(400).json({ error: { ...error } });
    }
  };

  static readOneRole = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
      const role = await Role.findById(id);

      if (!role) {
        return res
          .status(404)
          .json({ message: "No Role With This ID in The Database" });
      }

      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static updateRole = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
      const updateFields = {
        name,
      };
      const role = await Role.findByIdAndUpdate(id, updateFields, {
        new: true,
      });

      if (!role) {
        return res
          .status(404)
          .json({ message: "No Role With This ID in The Database" });
      }

      res.status(200).json(role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  static deleteRole = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
      const role = await Role.findByIdAndDelete(id);
      if (!role) {
        return res
          .status(404)
          .json({ message: "No Role With This ID in The Database" });
      }
      res.status(200).json({ message: "role deleted succefully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
export default RoleController ;
