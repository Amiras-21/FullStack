const nodemailer = require("nodemailer");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Function to generate a simple random password
// const generateRandomPassword = (length = 8) => {
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let password = "";
//   for (let i = 0; i < length; i++) {
//     password += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return password;
// };

const generateRandomPassword = (length = 10) => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "@$!%*?&";
  const allChars = uppercase + lowercase + numbers + specialChars;

  let password = "";

  // Ensure at least one character from each required category
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Fill remaining characters randomly
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to mix up required characters
  return password.split('').sort(() => 0.5 - Math.random()).join('');
};


exports.forgotPassword = async (req, res) => {
    try {
      const { email , password} = req.body;

      const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found " });
    }

    if (user.status === "Invitation Sent") {
      return res.status(400).json({ error: "Cannot reset password. User has not accepted the invitation yet. " });
    }

   // Generate a new password if the user's password is empty
  //  let newPassword = user.password;
  //  if (!user.password) {
  //    newPassword = generateRandomPassword(10); // Generates a simple 10-character password
  //    user.password = newPassword;
  //  }

   // Generate a new password if the user's password is empty
   const plainPassword = generateRandomPassword(10); // Generates a secure 10-character password

   // Hash the password before storing it in the database
   const hashedPassword = await bcrypt.hash(plainPassword, 10);

   user.password = hashedPassword;
   user.status = "active";
   await user.save();


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
         <p><strong>Password:</strong> ${plainPassword}</p>

          <p>If you did not request this, please ignore this email.</p>
          <p>Best Regards, <br/> Your App Team</p>
        `,
      };

    await transporter.sendMail(mailOptions);

   
    // await User.findOneAndUpdate({ email }, { status: "Invitation Sent" });

    res.json({ success: true, message: "Password reset email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
