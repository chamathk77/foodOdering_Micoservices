const mongoose = require('mongoose');

const PAYMENT_STATUSES = ['paid', 'failed'];

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, required: true, trim: true },
    status: {
      type: String,
      required: true,
      enum: PAYMENT_STATUSES,
      default: 'paid',
    },
  },
  { timestamps: true, collection: 'payment' }
);

const Payment = mongoose.model('Payment', paymentSchema);
Payment.PAYMENT_STATUSES = PAYMENT_STATUSES;
module.exports = Payment;
