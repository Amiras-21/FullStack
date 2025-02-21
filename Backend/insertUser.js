const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/evoqtech', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');

  // Define the User model schema
  const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
  });

  const User = mongoose.model('User', userSchema);

  // Create a new user
  const newUser = new User({
    email: 'user@example.com',
    password: 'yourpassword',
  });

  // Save the new user to the database
  newUser.save()
    .then(() => {
      console.log('User saved');
      mongoose.connection.close();
    })
    .catch(err => {
      console.error('Error saving user:', err);
      mongoose.connection.close();
    });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
