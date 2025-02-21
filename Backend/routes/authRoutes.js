const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

// router.get('/users',  async (req, res) => {
//   try {
//     const users = await User.find({},);
//     res.status(200).json(users);
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
router.get('/users', async (req, res) => {
  try {
    const { status ,  search } = req.query;
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 5;


    const query = { role: "user" }; 

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }



    const total_data = await User.countDocuments(query);
    const last_page = Math.ceil(total_data / pageSize);
    const adjustedPage = page - 1;
   
    const users = await User.find(query)
 
      .skip(adjustedPage * pageSize)
      .limit(parseInt(pageSize));
   
    // res.json({ users, total });
    res.json({
      users,
      page_information: {
        current_page: page,
        last_page,
        next_page: page < last_page ? page + 1 : 0,
        previous_page: page > 1 ? page - 1 : 0,
        total_data,
      },
      message: "Get users successfully.",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});





router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
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
      signupMethod : "admin",
    });

    await newUser.save();
    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Sign-up error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



router.post('/signup', async (req, res) => {
  
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
      role : "user",
      status: "active",
      signupMethod : "user",
    });

    await newUser.save();
    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Sign-up error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  email = email.trim();

  try {
    const user = await User.findOne({ email });

    

    if (user) {

      if (user.status !== "active") {
        return res.status(403).json({ message: "Your account is inactive. Contact support." });
      }
      
      if (password === user.password) {

        const token = jwt.sign(
          { userId: user._id, role: user.role },
          'your_jwt_secret_key',
          { expiresIn: '1h' }
        );

        return res.json({
          message: 'Login successful',
          token,
          role: user.role,
        });
      } else {

        return res.status(400).json({ message: 'Invalid credentials' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
