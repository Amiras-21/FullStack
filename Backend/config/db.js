const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);  // Exit the process if connection fails
  }
};

module.exports = connectDB;
