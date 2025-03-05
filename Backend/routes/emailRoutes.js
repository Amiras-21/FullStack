const express = require("express");
const { sendInvitationEmail } = require("../controllers/emailController");
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/email", sendInvitationEmail);

router.post("/accept-invitation", async (req, res) => {
    try {
      const { token } = req.body;
 
      if (!token) {
        return res.status(400).json({ error: "Token is required" });
      }
  
      // jwt.verify(token, "your_secret_key", async (err, decoded) => {
      //   if (err) {
      //     return res.status(400).json({ error: "Link Expired " });
      //   }

      // Extract email before verifying the token
    let decodedEmail;
    try {
      const decoded = jwt.decode(token); // Decode first without verifying
      decodedEmail = decoded?.email;
    } catch (decodeError) {
      console.error("Error decoding token:", decodeError);
    }

    jwt.verify(token, "your_secret_key", async (err, decoded) => {
      if (err) {
        console.log("Token verification failed, updating status...");

        // If token expired, update status
        if (decodedEmail) {
          const expiredUser = await User.findOne({ email: decodedEmail });
          if (expiredUser) {
            expiredUser.status = "password not set";
            await expiredUser.save();
            console.log(`User ${expiredUser.email} status updated to "password not set" due to expired token.`);
          }
        }
        return res.status(400).json({ error: "Link Expired ❌" });
      }

        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        
        user.status = "Invitation Accepted";
       
        const resetToken = jwt.sign(
          { email: user.email }, 
          "your_secret_key", 
          { expiresIn: "10m" }
      );

      user.resetPasswordToken = resetToken;
        await user.save();


      setTimeout(async () => {
        const updatedUser = await User.findOne({ email: decoded.email });
        if (updatedUser && updatedUser.status === "Invitation Accepted") {
            updatedUser.status = "password not set";
            await updatedUser.save();
        }
    }, 120000); 
  
        // const user = await User.findOneAndUpdate(
        //   { email: decoded.email },
        //   { status: "Invitation Accepted" },
        //   { new: true }
        // );
  
        // if (!user) {
        //   return res.status(404).json({ error: "User not found" });
        // }
  
        res.json({
          success: true,
          message: "Invitation Accepted ✅",
          resetToken,
        });
      });
  
    } catch (error) {
      console.error("Error accepting invitation:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });



module.exports = router;
