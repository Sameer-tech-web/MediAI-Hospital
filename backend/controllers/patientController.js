const mongoose = require('mongoose');
const Patient = require('../models/Patient');

const generateMRN = async () => {
  const lastPatient = await Patient.findOne({
    mrn: /^MRN-\d+$/,
  })
    .sort({ mrn: -1 })
    .select('mrn')
    .lean();

  const lastNumber = lastPatient
    ? Number(lastPatient.mrn.replace('MRN-', ''))
    : 0;

  return `MRN-${String(lastNumber + 1).padStart(5, '0')}`;
};

const registerPatient = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      contact,
      triageCategory,
      symptoms,
      assignedDoctor,
      bedNumber,
    } = req.body;

    if (!name || age === undefined || !gender || !contact || !symptoms) {
      return res.status(400).json({
        message: 'Name, age, gender, contact, and symptoms are required',
      });
    }

    if (assignedDoctor && !mongoose.isValidObjectId(assignedDoctor)) {
      return res.status(400).json({
        message: 'Invalid assigned doctor ID',
      });
    }

    const mrn = await generateMRN();

    const patient = await Patient.create({
      mrn,
      name: name.trim(),
      age,
      gender,
      contact: contact.trim(),
      triageCategory: triageCategory || 'Routine',
      symptoms: symptoms.trim(),
      assignedDoctor: assignedDoctor || null,
      bedNumber: bedNumber?.trim() || null,
    });

    return res.status(201).json(patient);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'A patient with this MRN already exists. Please try again.',
      });
    }

    console.error('Register Patient Error:', error.message);

    return res.status(500).json({
      message: 'Server error while registering patient',
    });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate('assignedDoctor', 'name email role')
      .sort({ createdAt: -1 });

    return res.status(200).json(patients);
  } catch (error) {
    console.error('Get Patients Error:', error.message);

    return res.status(500).json({
      message: 'Server error while fetching patients',
    });
  }
};

const getPatientById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid patient ID',
      });
    }

    const patient = await Patient.findById(req.params.id).populate(
      'assignedDoctor',
      'name email role'
    );

    if (!patient) {
      return res.status(404).json({
        message: 'Patient not found',
      });
    }

    return res.status(200).json(patient);
  } catch (error) {
    console.error('Get Patient Error:', error.message);

    return res.status(500).json({
      message: 'Server error while fetching patient',
    });
  }
};

const updatePatientStatus = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid patient ID',
      });
    }

    const {
      queueStatus,
      assignedDoctor,
      bedNumber,
      triageCategory,
    } = req.body;

    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        message: 'Patient not found',
      });
    }

    if (queueStatus !== undefined) {
      patient.queueStatus = queueStatus;
    }

    if (assignedDoctor !== undefined) {
      if (
        assignedDoctor !== null &&
        !mongoose.isValidObjectId(assignedDoctor)
      ) {
        return res.status(400).json({
          message: 'Invalid assigned doctor ID',
        });
      }

      patient.assignedDoctor = assignedDoctor;
    }

    if (bedNumber !== undefined) {
      patient.bedNumber = bedNumber?.trim() || null;
    }

    if (triageCategory !== undefined) {
      patient.triageCategory = triageCategory;
    }

    const updatedPatient = await patient.save();

    return res.status(200).json(updatedPatient);
  } catch (error) {
    console.error('Update Patient Error:', error.message);

    return res.status(500).json({
      message: 'Server error while updating patient',
    });
  }
};

const deletePatient = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid patient ID',
      });
    }

    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        message: 'Patient not found',
      });
    }

    await patient.deleteOne();

    return res.status(200).json({
      message: 'Patient removed successfully',
    });
  } catch (error) {
    console.error('Delete Patient Error:', error.message);

    return res.status(500).json({
      message: 'Server error while deleting patient',
    });
  }
};

module.exports = {
  registerPatient,
  getPatients,
  getPatientById,
  updatePatientStatus,
  deletePatient,
};
