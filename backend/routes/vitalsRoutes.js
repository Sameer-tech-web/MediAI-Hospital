const express = require('express');

const router = express.Router();

const {
  recordVitals,
  getPatientVitals,
  getLatestVitals,
} = require('../controllers/vitalsController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, recordVitals);

router.get('/:patientId/latest', protect, getLatestVitals);
router.get('/:patientId', protect, getPatientVitals);

module.exports = router;
