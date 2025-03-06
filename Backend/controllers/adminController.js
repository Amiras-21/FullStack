const Admin = require("../models/Admin");

exports.getAdmins = async (req, res) => {
  try {
    
    const { page = 1, pageSize = 5, status, search } = req.query;
    let query = {};

    if (status) query.status = status;
    if (search) query.firstName = { $regex: search, $options: "i" };

    const totalAdmins = await Admin.countDocuments(query);
    const admins = await Admin.find(query)
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));

      const response = { 
        results: admins.map((admin) => ({ ...admin.toObject(), id: admin._id, password: "********" })), 
        pagination: { total_data: totalAdmins, page, pageSize } 
      };
  
  
      res.json(response);

    // res.json({ admins, page_information: { total_data: totalAdmins, page, pageSize } });
    // res.json({ 
    //   results: admins.map((admin) => ({ ...admin.toObject(), id: admin._id })), 
    //   pagination: { total_data: totalAdmins, page, pageSize } 
    // });
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
};
