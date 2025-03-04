const nodemailer = require("nodemailer");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.sendInvitationEmail = async (req, res) => {
  const { email, firstName } = req.body;

  try {
    const token = jwt.sign({ email }, "your_secret_key", { expiresIn: "1m" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // user: process.env.EMAIL_USER,
        // pass: process.env.EMAIL_PASS,
        user : "amiras09mxmx09@gmail.com",
        pass : "lrit iozv vivs ygko"
      },
    });

    const mailOptions = {
      // from: process.env.EMAIL_USER,
      from : "amiras09mxmx09@gmail.com",
      to: email,
      subject: "Invitation to Join",
      html: `
    <p>Hello ${firstName},</p>
    <p>You have been invited to join the platform. Below are your login credentials:</p>

    <p><strong>Email:</strong> ${email}</p>
  

    <p>Click the button below to accept the invitation and log in:</p>

    <a href="http://localhost:3000/Acceptinvitation?token=${token}" 
       style="display: inline-block; padding: 10px 20px; margin: 10px 0; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">
       Accept Invitation
    </a>

    <p>Best regards, <br/> Your Platform Team</p>
  `,
};

    await transporter.sendMail(mailOptions);

   
    await User.findOneAndUpdate({ email }, { status: "Invitation Sent" });

    res.json({ success: true, message: "Invitation email sent and status updated." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
