const express = require('express');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Trainer = require('../models/Trainer');
const SuperAdmin = require('../models/SuperAdmin');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { forgotPassword } = require("../controllers/ForgotPasswordController");

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// router.get('/users',  async (req, res) => {
//   try {
//     const users = await User.find({},);
//     res.status(200).json(users);
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// router.get('/users', async (req, res) => {
//   try {
//     const { status ,  search } = req.query;
//     const page = parseInt(req.query.page) || 0;
//     const pageSize = parseInt(req.query.pageSize) || 5;


//     const query = { role: "user" };

//     if (status) {
//       query.status = status;
//     }

//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { email: { $regex: search, $options: "i" } }
//       ];
//     }



//     const total_data = await User.countDocuments(query);
//     const last_page = Math.ceil(total_data / pageSize);
//     const adjustedPage = page - 1;

//     const users = await User.find(query)

//       .skip(adjustedPage * pageSize)
//       .limit(parseInt(pageSize));

//     // res.json({ users, total });
//     res.json({
//       users,
//       page_information: {
//         current_page: page,
//         last_page,
//         next_page: page < last_page ? page + 1 : 0,
//         previous_page: page > 1 ? page - 1 : 0,
//         total_data,
//       },
//       message: "Get users successfully.",
//       success: true,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// router.get('/admins', async (req, res) => {
//   try {
//     const { status ,  search } = req.query;
//     const page = parseInt(req.query.page) || 0;
//     const pageSize = parseInt(req.query.pageSize) || 5;


//     const query = { role: "admin" };

//     if (status) {
//       query.status = status;
//     }

//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { email: { $regex: search, $options: "i" } }
//       ];
//     }



//     const total_data = await Admins.countDocuments(query);
//     const last_page = Math.ceil(total_data / pageSize);
//     const adjustedPage = page - 1;

//     const admins = await Admins.find(query)

//       .skip(adjustedPage * pageSize)
//       .limit(parseInt(pageSize));

//     res.json({
//       admins,
//       page_information: {
//         current_page: page,
//         last_page,
//         next_page: page < last_page ? page + 1 : 0,
//         previous_page: page > 1 ? page - 1 : 0,
//         total_data,
//       },
//       message: "Get admin successfully.",
//       success: true,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", async (req, res) => {
  try {
    // const {email, newPassword } = req.body;
    const { token, newPassword } = req.body;

     // ✅ Verify Token
     const decoded = jwt.verify(token, "your_secret_key");
     if (!decoded || !decoded.email) {
         return res.status(400).json({ error: "Invalid or Expired Token ❌" });
     }

      // ✅ Find User by Email & Token
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
          return res.status(404).json({ error: "User not found ❌" });
      }


  // const user = await User.findOne({ email });
  // if (!user) {
  //     return res.status(404).json({ error: "User not found" });
  // }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
      // user.password = newPassword;
      user.status = "active";
      await user.save();


      // Update Password in DB
      // await User.findOneAndUpdate(
      //   { email: decoded.email },
      //   { password:  newPassword },
      //   { new: true }
      // );

      res.json({ success: true, message: "Password Reset Successfully ✅" });
   

  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal Server Error" });
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

    const hashedPassword = await hashPassword(password);

    
    const newUser = new User({
      firstName,
      email,
      password : hashedPassword,
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
  email = email.trim();

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = await SuperAdmin.findOne({ email });
    }
    if (!user) {
      user = await Admin.findOne({ email });
    }
    if (!user) {
      user = await Trainer.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    
    if (user) {
      // if (user.status !== "active") {
      //   return res.status(403).json({ message: "Your account is inactive. Contact support." });
      // } 

      if (user.status !== "active") {
        let message = "Your account status does not allow this action.";
    
        switch (user.status) {
            case "Invitation Sent":
                message = "Your invitation is pending. Please check your email to accept the invitation.";
                break;
            case "Invitation Accepted":
                message = "You have accepted the invitation, but your password is not set. Please reset your password.";
                break;
            case "password not set":
                message = "Your password is not set. Please reset your password to activate your account.";
                break;
            case "inactive":
                message = "Your account is inactive. Contact support.";
                break;
        }
    
        return res.status(403).json({ message });
    }

    if (!user.password) {
      return res.status(400).json({ message: "Your password is not set. Please use Forgot Password to set a new password." });
    }

      // if (password === user.password){ 
      const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

        const token = jwt.sign(
          { userId: user._id, role: user.role, trainerId: user.trainerId || user._id, adminId:user.adminId || user._id, },
          'your_jwt_secret_key',
          { expiresIn: '1h' }
        );

        return res.json({
          message: 'Login successful',
          token,
          role: user.role,
          userId:user._id,
        });
      // } else {
      //   console.log("Password does not match!");
      //   return res.status(400).json({ message: 'Invalid credentials' });
      // }
    // } else {
    //   console.log("User not found!");
    //   return res.status(400).json({ message: 'Invalid credentials' });
    // }
      }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
