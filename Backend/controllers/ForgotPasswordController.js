const nodemailer = require("nodemailer");
const User = require("../models/User");


exports.forgotPassword = async (req, res) => {
    try {
      const { email , password} = req.body;

      const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found ❌" });
    }

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
        from: "amiras09mxmx09@gmail.com",
        to: email,
        subject: "Password Reset Request",
        html: `
          <p>Hello,</p>
          <p>You requested to reset your password.</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Password:</strong> ${user.password}</p>

          <p>If you did not request this, please ignore this email.</p>
          <p>Best Regards, <br/> Your App Team</p>
        `,
      };

    await transporter.sendMail(mailOptions);

   
    // await User.findOneAndUpdate({ email }, { status: "Invitation Sent" });

    res.json({ success: true, message: "Password reset email sent successfully ✅" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
