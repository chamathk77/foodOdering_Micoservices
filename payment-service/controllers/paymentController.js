const Payment = require('../models/Payment');

exports.listPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find().lean();
    res.json({ success: true, data: payments });
  } catch (err) {
    next(err);
  }
};

exports.getPayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id).lean();
    if (!payment) {
      const e = new Error('Payment not found');
      e.statusCode = 404;
      return next(e);
    }
    res.json({ success: true, data: payment });
  } catch (err) {
    if (err.name === 'CastError') {
      const e = new Error('Invalid payment id');
      e.statusCode = 400;
      return next(e);
    }
    next(err);
  }
};

exports.createPayment = async (req, res, next) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json({ success: true, data: payment });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const e = new Error(Object.values(err.errors).map((x) => x.message).join(', '));
      e.statusCode = 400;
      return next(e);
    }
    next(err);
  }
};

exports.updatePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!payment) {
      const e = new Error('Payment not found');
      e.statusCode = 404;
      return next(e);
    }
    res.json({ success: true, data: payment });
  } catch (err) {
    if (err.name === 'CastError') {
      const e = new Error('Invalid payment id');
      e.statusCode = 400;
      return next(e);
    }
    if (err.name === 'ValidationError') {
      const e = new Error(Object.values(err.errors).map((x) => x.message).join(', '));
      e.statusCode = 400;
      return next(e);
    }
    next(err);
  }
};

exports.deletePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id).lean();
    if (!payment) {
      const e = new Error('Payment not found');
      e.statusCode = 404;
      return next(e);
    }
    res.json({ success: true, message: 'Payment deleted', data: payment });
  } catch (err) {
    if (err.name === 'CastError') {
      const e = new Error('Invalid payment id');
      e.statusCode = 400;
      return next(e);
    }
    next(err);
  }
};
