const mongoose = require('mongoose');

const HealthProgramSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const HealthProgram = mongoose.model('HealthProgram', HealthProgramSchema);
module.exports = HealthProgram;