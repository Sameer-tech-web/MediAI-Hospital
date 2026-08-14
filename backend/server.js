const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');

// Load Environment Variables
dotenv.config();

const app = express();

// Middleware: CORS Configuration
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware: JSON Parsing
app.use(express.json());

// Ensure MongoDB connects before processing any requests (Crucial for Serverless Environments)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection failed during request:', error.message);
    res.status(500).json({
      success: false,
      message: 'Database Connection Error. Please try again later.',
    });
  }
});

// Root Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MediAI Hospital System API is running...',
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/patients', require('./routes/patientRoutes.js'));
app.use('/api/vitals', require('./routes/vitalsRoutes.js'));

// 404 Route Handler (For Undefined Routes)
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);

  const statusCode = res.statusCode && res.statusCode >= 400 ? res.statusCode : err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Export Express App for Vercel Serverless Functions
module.exports = app;

// Start Server locally if run directly via Node.js
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
