const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['paid', 'pending'], default: 'pending' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  billType: { type: String, enum: ['security', 'other'], required: true },
});

module.exports = mongoose.model('Bill', BillSchema);
