const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
console.log('Client model got:', Client);

const Enrollment = require('../models/Enrollment');

// Register new client
router.post('/', async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all clients
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    const query = q ? { 
      $or: [
        { firstName: { $regex: q, $options: 'i' } },
        { lastName: { $regex: q, $options: 'i' } }
      ]
    } : {};
    
    const clients = await Client.find(query).sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single client with programs
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    
    const enrollments = await Enrollment.find({ client: client._id }).populate('program');
    const programs = enrollments.map(e => e.program);
    
    res.json({ ...client.toObject(), programs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;