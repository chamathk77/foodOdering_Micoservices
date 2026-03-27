const mongoose = require('mongoose');

const MONGODB_URI =
  'mongodb+srv://chamath77:Chamath%4077@cluster0.rrnlgb7.mongodb.net/mtit_project?retryWrites=true&w=majority&appName=Cluster0';

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected (payment-service) → mtit_project / payment');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
