import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
  },
});


const Role = mongoose.model("roles", roleSchema); // the Roles here is the name for table at data base

export default Role
