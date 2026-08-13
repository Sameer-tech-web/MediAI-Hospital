const mongoose = require('mongoose');

const vitalsSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Patient is required'],
    },

    heartRate: {
      type: Number,
      required: [true, 'Heart rate is required'],
      min: [0, 'Heart rate cannot be negative'],
    },

    bloodPressure: {
      systolic: {
        type: Number,
        required: [true, 'Systolic blood pressure is required'],
        min: [0, 'Systolic blood pressure cannot be negative'],
      },

      diastolic: {
        type: Number,
        required: [true, 'Diastolic blood pressure is required'],
        min: [0, 'Diastolic blood pressure cannot be negative'],
      },
    },

    spo2: {
      type: Number,
      required: [true, 'SpO2 is required'],
      min: [0, 'SpO2 cannot be negative'],
      max: [100, 'SpO2 cannot exceed 100'],
    },

    temperature: {
      type: Number,
      required: [true, 'Temperature is required'],
    },

    respiratoryRate: {
      type: Number,
      required: [true, 'Respiratory rate is required'],
      min: [0, 'Respiratory rate cannot be negative'],
    },

    alertStatus: {
      type: String,
      enum: ['Normal', 'Warning', 'Critical'],
      default: 'Normal',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Vitals', vitalsSchema);
