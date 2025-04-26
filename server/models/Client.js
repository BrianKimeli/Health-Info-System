const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date },
  contactNumber: { type: String },
  email: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Client = mongoose.model('Client', ClientSchema);
module.exports = Client;