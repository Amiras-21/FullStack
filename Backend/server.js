const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const userRoutes = require('./routes/userRoutes')
const emailRoutes = require("./routes/emailRoutes");


const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors({ 
  origin: ["http://localhost:3000","https://track-4-rho.vercel.app"], 
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

mongoose.connect('mongodb://localhost:27017/login', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
