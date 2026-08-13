const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/patients', require('./routes/patientRoutes.js'));
app.use('/api/vitals', require('./routes/vitalsRoutes.js'));

// Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MediAI Hospital System API is running...',
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && {
      stack: err.stack,
    }),
  });
});

// Connect to MongoDB
connectDB().catch((error) => {
  console.error('Failed to connect to MongoDB:', error.message);
});

// Local development server
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `Server running in ${
        process.env.NODE_ENV || 'development'
      } mode on port ${PORT}`
    );
  });
}

module.exports = app;
