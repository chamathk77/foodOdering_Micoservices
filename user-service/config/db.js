const mongoose = require('mongoose');

// Database: mtit_project | Collection: user (see models/User.js)
// Password @ in URI must be encoded as %40
const MONGODB_URI =
  'mongodb+srv://chamath77:Chamath%4077@cluster0.rrnlgb7.mongodb.net/mtit_project?retryWrites=true&w=majority&appName=Cluster0';

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected (user-service) → mtit_project / user');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
