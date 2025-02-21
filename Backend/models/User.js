
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  signupMethod: { type: String, enum: ["admin", "user"],  },
});

module.exports = mongoose.model('User', userSchema);
