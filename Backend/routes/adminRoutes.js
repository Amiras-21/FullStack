const express = require("express");
const { getAdmins } = require("../controllers/adminController");
const router = express.Router();
const Admin = require("../models/Admin")

router.get("/admins", getAdmins);

router.post("/admins/create", async (req, res) => {
  try {
    const { firstName, email, password } = req.body;
    const admin = new Admin({ firstName, email, password });
    await admin.save();
    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/admins/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, email ,password, status} = req.body;
  
      const updatedAdmin = await Admin.findByIdAndUpdate(id, { firstName, email,password, status }, { new: true });
      if (!updatedAdmin) {
        return res.status(404).json({ message: "Admin not found" });
      }

    // Update fields only if they are provided
      if (firstName) updatedAdmin .firstName = firstName;
      if (email) updatedAdmin .email = email;
      if (status) updatedAdmin .status = status;
      await updatedAdmin.save();
  
      res.status(200).json({ message: "Admin updated successfully", admin: updatedAdmin });
    } catch (error) {
      console.error("Error updating admin:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  
  router.delete("/admins/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedAdmin = await Admin.findByIdAndDelete(id);
      if (!deletedAdmin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
      console.error("Error deleting admin:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;
