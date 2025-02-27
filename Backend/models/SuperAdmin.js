const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "superadmin", immutable: true }, // Fixed Role
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  signupMethod: { type: String, default: "system" }, // SuperAdmin is usually created manually
}, { timestamps: true });

module.exports = mongoose.model("SuperAdmin", superAdminSchema, "superAdmin");
