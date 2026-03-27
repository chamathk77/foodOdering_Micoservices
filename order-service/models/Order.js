const mongoose = require('mongoose');

const ORDER_STATUSES = ['pending', 'completed', 'cancelled'];

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, trim: true },
    items: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'items must be a non-empty array of menu item ids',
      },
    },
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      required: true,
      enum: ORDER_STATUSES,
      default: 'pending',
    },
  },
  { timestamps: true, collection: 'order' }
);

const Order = mongoose.model('Order', orderSchema);
Order.ORDER_STATUSES = ORDER_STATUSES;
module.exports = Order;
