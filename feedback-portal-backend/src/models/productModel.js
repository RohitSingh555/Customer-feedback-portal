const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    description: String,
    feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }], // Make sure 'ref' matches the model name 'Feedback'
  });
  
  const Product = mongoose.model('Product', productSchema);
  
  module.exports = Product;
  