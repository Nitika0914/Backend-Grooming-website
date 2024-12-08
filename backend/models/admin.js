// admin.js - models
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // Import jwt for token generation

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// Add generateAuthToken method to the admin schema
adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, role: this.role },
    'secretkey', // Replace 'secretkey' with a more secure key
    { expiresIn: '1h' }
  );
  return token;
};

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
