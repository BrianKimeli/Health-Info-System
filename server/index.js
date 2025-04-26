require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const clientRoutes = require('./routes/clients');
const programRoutes = require('./routes/programs');
const enrollmentRoutes = require('./routes/enrollments');

app.use('/api/clients', clientRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// Test route
app.get('/test', (req, res) => res.send('Server working!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));