import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  roles: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roles",
    required: true,
  },
});

adminSchema.pre("find", function (next) {
  this.populate("roles");
  next();
});

// Static method for comparing passwords
adminSchema.statics.comparePassword = async function (
  candidatePassword,
  hashedPassword
) {
  try {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  } catch (error) {
    throw error;
  }
};

const Admin = mongoose.model("admins", adminSchema);

export default Admin;
