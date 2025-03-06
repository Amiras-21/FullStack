const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Import Models
const User = require("./models/User");
const Trainer = require("./models/Trainer");
const Admin = require("./models/Admin");
// const SuperAdmin = require("./models/SuperAdmin");

const MONGO_URI = "mongodb://localhost:27017/login"; // Update if needed

async function hashPasswordsForModel(Model, modelName) {
  try {
    const users = await Model.find(); // Fetch all users
    console.log(`🔍 Found ${users.length} users in ${modelName}`);

    for (const user of users) {
      // Check if password is already hashed
      if (user.password && !user.password.startsWith("$2a$") && !user.password.startsWith("$2b$")) {
        console.log(`🔑 Hashing password for ${user.email} in ${modelName}...`);

        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Forcefully update password
        await Model.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });

        console.log(`✅ Updated password for ${user.email} in ${modelName}`);
      }
    }
  } catch (error) {
    console.error(`❌ Error updating passwords for ${modelName}:`, error);
  }
}

async function hashAllPasswords() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🔌 Connected to database:", mongoose.connection.name);

    await hashPasswordsForModel(User, "User");
    await hashPasswordsForModel(Trainer, "Trainer");
    await hashPasswordsForModel(Admin, "Admin");
    // await hashPasswordsForModel(SuperAdmin, "SuperAdmin");

    console.log("✅ All plaintext passwords have been hashed.");
  } catch (error) {
    console.error("❌ Error connecting to database:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the migration
hashAllPasswords();
