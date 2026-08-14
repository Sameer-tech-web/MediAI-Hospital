const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// -----------------------------
// Database Connection Manager
// -----------------------------
let isConnected = false;

const ensureDBConnection = async (req, res, next) => {
  if (isConnected) {
    return next();
  }

  try {
    await connectDB();
    isConnected = true;
    next();
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// -----------------------------
// Middleware
// -----------------------------
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Attach Database Connection Middleware to all API routes
app.use(ensureDBConnection);

// -----------------------------
// API Routes
// -----------------------------
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/vitals', require('./routes/vitalsRoutes'));

// -----------------------------
// Health Check
// -----------------------------
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MediAI Hospital System API is running...',
    timestamp: new Date().toISOString(),
  });
});

// -----------------------------
// API 404 Handler
// -----------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// -----------------------------
// Global Error Handler
// -----------------------------
app.use((err, req, res, next) => {
  console.error('Server Error:', err);

  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// -----------------------------
// Local Development Listener
// -----------------------------
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;

  connectDB()
    .then(() => {
      isConnected = true;
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Failed to connect to MongoDB on startup:', error.message);
      process.exit(1);
    });
}

// Export Express app for Vercel Serverless
module.exports = app;
