const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    availability: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, collection: 'menu' }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);
