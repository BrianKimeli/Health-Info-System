const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');

// Enroll client in program
router.post('/', async (req, res) => {
  try {
    const enrollment = new Enrollment(req.body);
    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;