const User = require("../models/User");

exports.getUsersByTrainer = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const { page = 1, pageSize = 5, status, search } = req.query;

    let query = { trainerId };
    if (status) query.status = status;
    if (search) query.firstName = { $regex: search, $options: "i" };

    const totalUsers = await User.countDocuments(query);
    const users = await User.find(query)
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));

      const response = { 
        results: users.map((user) => ({ ...user.toObject(), id: user._id })), 
        pagination: { total_data: totalUsers, page, pageSize } 
      };
  
      console.log("🚀 Backend Response:", response);
  
      res.json(response);
    // res.json({ users, page_information: { total_data: totalUsers, page, pageSize } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
