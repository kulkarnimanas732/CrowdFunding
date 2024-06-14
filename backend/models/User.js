const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true // Ensure unique mobile number
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['investor', 'charity', 'artist']
  },
  document: {
    type: String,
    required: true
  },
  documentVerified: {
    type: Boolean,
    default: false
  },
  documentUnverified:{
    type: Boolean,
    default:false
  }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
