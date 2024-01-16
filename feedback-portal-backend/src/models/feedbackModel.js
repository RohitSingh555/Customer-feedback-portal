const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  customerName: String,
  rating: Number,
  feedbackMessage: String,
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
