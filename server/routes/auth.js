const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Hardcoded valid credentials
const VALID_USER = {
  username: 'doctor',
  password: 'test123', // Only for comparison - not used in production
  role: 'doctor'
};

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Simple credential check
    if (username !== VALID_USER.username || password !== VALID_USER.password) {
      return res.status(400).json({ error: 'Invalid credentials.\nPlease try username: "doctor" and password: "test123".' });
    }

    // Create real JWT token
    const token = jwt.sign(
      { username: VALID_USER.username, role: VALID_USER.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        username: VALID_USER.username,
        role: VALID_USER.role
      }
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/verify', auth, async (req, res) => {
  res.json(req.user);
});

module.exports = router;