
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: ['superadmin', 'user'],
//     default: 'user',
//   },
//   status: { type: String, enum: ["active", "inactive"], default: "active" },
//   signupMethod: { type: String, enum: ["superadmin", "user"],  },
// });

// module.exports = mongoose.model('User', userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  password: String,
  role: { type: String, default: "user" }, 
  status: { type: String, enum: ["active", "inactive", "Invitation Accepted", "password not set", "Invitation Sent"], default: "active" },
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer", required: true },
});

module.exports = mongoose.model("User", userSchema);
