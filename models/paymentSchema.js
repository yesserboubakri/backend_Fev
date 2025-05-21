const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  // 🔗 Relation : chaque paiement appartient à un seul utilisateur
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  amount: { type: Number, required: true },
  method: {
    type: String,
    enum: ['espèce', 'chèque', 'virement'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
