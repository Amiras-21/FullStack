const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getUserById = async (req, res) => {
    try {
      const { userId } = req.params;
      const users = await User.findById(userId);
  
      if (!users) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const response = { 
        results: { ...users.toObject(), id: users._id } 
      };
  
      res.json(response);
    //   res.json({ user: { ...user.toObject(), id: user._id } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  