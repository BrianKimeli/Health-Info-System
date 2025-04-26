const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  program: { type: mongoose.Schema.Types.ObjectId, ref: 'HealthProgram', required: true },
  enrollmentDate: { type: Date, default: Date.now }
});

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);
module.exports = Enrollment;