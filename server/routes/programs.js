const express = require('express');
const router = express.Router();
const HealthProgram = require('../models/HealthProgram');

// Create health program
router.post('/', async (req, res) => {
  try {
    const program = new HealthProgram(req.body);
    await program.save();
    res.status(201).json(program);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all programs
router.get('/', async (req, res) => {
  try {
    const programs = await HealthProgram.find().sort({ name: 1 });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;