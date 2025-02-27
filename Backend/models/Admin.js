const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  password: String,
  role: { type: String, default: "admin" },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

module.exports = mongoose.model("Admin", adminSchema, "admins");
