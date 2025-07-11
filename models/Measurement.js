const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  chest: String,
  waist: String,
  hip: String,
  inseam: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'kids'],
    default: 'male'
  }
}, { timestamps: true });

module.exports = mongoose.model('Measurement', measurementSchema);
