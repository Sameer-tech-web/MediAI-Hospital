const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    mrn: {
      type: String,
      required: [true, 'Medical Record Number is required'],
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
    },

    age: {
      type: Number,
      required: [true, 'Patient age is required'],
      min: [0, 'Patient age cannot be negative'],
      max: [150, 'Patient age cannot exceed 150'],
    },

    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['Male', 'Female', 'Other'],
    },

    contact: {
      type: String,
      required: [true, 'Contact number is required'],
      trim: true,
    },

    triageCategory: {
      type: String,
      enum: ['Emergency', 'Urgent', 'Routine'],
      default: 'Routine',
    },

    symptoms: {
      type: String,
      required: [true, 'Symptoms are required'],
      trim: true,
    },

    queueStatus: {
      type: String,
      enum: ['Waiting', 'In Treatment', 'Completed', 'Discharged'],
      default: 'Waiting',
    },

    assignedDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    bedNumber: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Patient', patientSchema);
