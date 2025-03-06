const Trainer = require("../models/Trainer");

exports.getTrainersByAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { page = 1, pageSize = 5, status, search } = req.query;
    
    let query = { adminId };
    if (status) query.status = status;
    if (search) query.firstName = { $regex: search, $options: "i" };

    const totalTrainers = await Trainer.countDocuments(query);
    const trainers = await Trainer.find(query)
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));

      const response = { 
        results: trainers.map((trainer) => ({ ...trainer.toObject(), id: trainer._id, password: "********" })), 
        pagination: { total_data: totalTrainers, page, pageSize } 
      };
  
  
      res.json(response);

    // res.json({ trainers, page_information: { total_data: totalTrainers, page, pageSize } });
    // res.json({ 
    //   results: trainers.map((trainer) => ({ ...trainer.toObject(), id: trainer._id })), 
    //   pagination: { total_data: totalTrainers, page, pageSize } 
    // });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
