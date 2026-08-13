const express = require('express');

const router = express.Router();

const {
  registerPatient,
  getPatients,
  getPatientById,
  updatePatientStatus,
  deletePatient,
} = require('../controllers/patientController');

const { protect } = require('../middleware/authMiddleware');

// Patient collection routes
router
  .route('/')
  .post(protect, registerPatient)
  .get(protect, getPatients);

// Individual patient routes
router
  .route('/:id')
  .get(protect, getPatientById)
  .put(protect, updatePatientStatus)
  .delete(protect, deletePatient);

module.exports = router;
