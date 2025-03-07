const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const userRoutes = require('./routes/userRoutes')
const emailRoutes = require("./routes/emailRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const DB_CONNECT = process.env.DB_CONNECT || 'mongodb://localhost:27017/login'; 

console.log("DB_CONNECT:", DB_CONNECT);

// app.use(cors());
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors({ 
  origin: ["http://localhost:3000","https://track-4-rho.vercel.app", "https://track-4-pi.vercel.app"], 
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"] }));

app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/auth', adminRoutes);
app.use('/api/auth', trainerRoutes);
app.use('/api/auth', userRoutes);
app.use("/api/auth", emailRoutes);


mongoose.connect(DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

  mongoose.connection.on("connected", () => {
    console.log(" Connected to MongoDB");
  });
  
  mongoose.connection.on("error", (err) => {
    console.error(" MongoDB connection error:", err);
  });
  
  mongoose.connection.on("disconnected", () => {
    console.log(" MongoDB disconnected");
  });

  // Global error handler (to log detailed errors)
app.use((err, req, res, next) => {
  console.error(" Unhandled Server Error:", err);
  res.status(500).json({ message: 'Server error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
