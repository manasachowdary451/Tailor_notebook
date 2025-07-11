const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  item: String,
  status: {
    type: String,
    enum: ['Pending', 'Done', 'Delivered'],
    default: 'Pending'
  },
  deliveryDate: Date,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
