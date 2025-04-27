require('events').EventEmitter.defaultMaxListeners = 15;
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

const corsOptions = {
  origin: [
    'https://health-info-system-jade.vercel.app', // Vercel domain
    'http://localhost:3000' // For local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};


// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

  const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
      });
      console.log('✅ MongoDB connected');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    }
  };
  
  // Call connectDB instead of using mongoose.connect directly
  connectDB();
  mongoose.connection.once('open', async () => {
    try {
      const exists = await User.exists({ username: 'doctor' });
      if (!exists) {
        await User.create({
          username: 'doctor',
          password: 'test123', // Will be hashed automatically
          role: 'doctor'
        });
        console.log('✅ Test user created');
      }
    } catch (err) {
      console.error('Test user setup failed:', err);
    }
  });

  //health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Routes
const clientRoutes = require('./routes/clients');
const programRoutes = require('./routes/programs');
const enrollmentRoutes = require('./routes/enrollments');
const authRoutes = require('./routes/auth');

app.use('/api/clients', clientRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/auth', authRoutes);
// Test route
app.get('/test', (req, res) => res.send('Server working!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));