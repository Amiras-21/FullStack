const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  password: String,
  role: { type: String, default: "trainer" },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
});

module.exports = mongoose.model("Trainer", trainerSchema, "trainers");
