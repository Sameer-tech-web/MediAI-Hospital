const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

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

// Fake In-Memory Data (Database aur AI ki jagah use hoga)
const mockData = {
  stats: {
    totalPatients: 1482,
    todayPatients: 48,
    doctorsAvailable: 18,
    todayAppointments: 32,
    criticalPatients: 5,
    pendingReports: 12
  },
  patients: [
    { id: "1042", mrn: "#1042", cnic: "42101-9988221-1", name: "John Doe", age: 42, gender: "Male", bloodGroup: "O+", status: "Critical", bedNumber: "ICU-04", doctor: "Dr. Sarah Connor" },
    { id: "1043", mrn: "#1043", cnic: "42101-1122334-5", name: "Emma Watson", age: 32, gender: "Female", bloodGroup: "A+", status: "Admitted", bedNumber: "Ward 3", doctor: "Dr. Chen" }
  ],
  labs: [
    { id: "L1", patientName: "John Doe", testName: "CBC Report", category: "Hematology", status: "Completed", results: "Normal", reportDate: "2026-08-20" }
  ]
};

// Root Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MediAI Hospital System API is running (Clean Mode - No DB/AI)...',
  });
});

// API Routes (Pure Backend Mock Endpoints)

// 1. Auth Endpoint (Fake Login)
app.post('/api/auth/login', (req, res) => {
  const { identifier } = req.body;
  return res.json({
    success: true,
    token: "mock-jwt-token-123456",
    user: {
      id: "usr_101",
      name: identifier && identifier.includes("doctor") ? "Dr. Sarah Connor" : "System User",
      email: identifier || "admin@mediai.com",
      role: identifier && identifier.includes("doctor") ? "doctor" : "admin"
    }
  });
});

// 2. Dashboard Stats API
app.get('/api/dashboard/stats', (req, res) => {
  res.json(mockData.stats);
});

// 3. Patients API
app.get('/api/patients', (req, res) => {
  res.json(mockData.patients);
});

app.post('/api/patients', (req, res) => {
  const newPatient = { id: String(Date.now()), ...req.body };
  mockData.patients.unshift(newPatient);
  res.status(201).json({ success: true, patient: newPatient });
});

// 4. Labs API
app.get('/api/labs', (req, res) => {
  res.json(mockData.labs);
});

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
