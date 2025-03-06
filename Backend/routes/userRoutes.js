const express = require("express");
const { getUsersByTrainer } = require("../controllers/userController");
const {getUserById} = require("../controllers/useridController");
const router = express.Router();
const User = require('../models/User');
const Trainer = require('../models/Trainer');
const bcrypt = require("bcrypt");


router.get("/users/trainer/:trainerId", getUsersByTrainer);

router.get("/users/:userId", getUserById);


router.post("/users/create", async (req, res) => {
  try {
    const { firstName, email, password, trainerId } = req.body;

    if (!trainerId) {
      return res.status(400).json({ error: "trainerId is required" });
    }
    

    const trainer = await Trainer.findById(trainerId);
    if (!trainer) return res.status(404).json({ error: "Trainer not found" });

    const user = new User({ firstName, email, password, trainerId });
    await user.save();

    res.status(201).json({ message: "User added successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, email,password, status  } = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, { firstName, email,password, status  }, { new: true });

    if (firstName) updatedUser.firstName = firstName;
      if (email) updatedUser.email = email;
      if (status) updatedUser.status = status;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updatedUser.password = await bcrypt.hash(password, salt);
      }
      await updatedUser.save();
  
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/add', async (req, res) => {
  
  let { firstName, email, password, role} = req.body;


  if (!firstName || !email || !password) {
    return res.status(400).json({ message: 'First Name, Email, and Password are required' });
  }

  email = email.trim();

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const newUser = new User({
      firstName,
      email,
      password,
      role,
      status: "active",
      signupMethod : "superadmin",
    });

    await newUser.save();
    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Sign-up error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
