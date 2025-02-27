const express = require("express");
const { getTrainersByAdmin } = require("../controllers/trainerController");
const router = express.Router();
const Trainer = require("../models/Trainer")
const Admin = require("../models/Admin")

router.get("/trainers/admin/:adminId", getTrainersByAdmin);

router.post("/trainers/create", async (req, res) => {
  try { 
    const { firstName, email, password, adminId } = req.body;

    if (!adminId) {
      return res.status(400).json({ error: "adminId is required" });
    }


    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

   
    const trainer = new Trainer({ firstName, email, password, adminId });
    await trainer.save();

    res.status(201).json({ message: "Trainer added successfully", trainer });
  } catch (error) {
    console.error("Error adding trainer:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/trainers/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, email,password, status } = req.body;
  
      const updatedTrainer = await Trainer.findByIdAndUpdate(id, { firstName, email,password, status }, { new: true });
      if (!updatedTrainer) {
        return res.status(404).json({ message: "Trainer not found" });
      }

      if (firstName) updatedTrainer.firstName = firstName;
      if (email) updatedTrainer.email = email;
      if (status) updatedTrainer.status = status;
      await updatedTrainer.save();
  
      res.status(200).json({ message: "Trainer updated successfully", trainer: updatedTrainer });
    } catch (error) {
      console.error("Error updating trainer:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  
  router.delete("/trainers/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedTrainer = await Admin.findByIdAndDelete(id);
      if (!deletedTrainer) {
        return res.status(404).json({ message: "Trainer not found" });
      }
  
      res.status(200).json({ message: "Trainer deleted successfully" });
    } catch (error) {
      console.error("Error deleting trainer:", error);
      res.status(500).json({ message: "Server error" });
    }
  });


module.exports = router;
