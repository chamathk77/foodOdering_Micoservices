const Order = require('../models/Order');

exports.listOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().lean();
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).lean();
    if (!order) {
      const e = new Error('Order not found');
      e.statusCode = 404;
      return next(e);
    }
    res.json({ success: true, data: order });
  } catch (err) {
    if (err.name === 'CastError') {
      const e = new Error('Invalid order id');
      e.statusCode = 400;
      return next(e);
    }
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const e = new Error(Object.values(err.errors).map((x) => x.message).join(', '));
      e.statusCode = 400;
      return next(e);
    }
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!order) {
      const e = new Error('Order not found');
      e.statusCode = 404;
      return next(e);
    }
    res.json({ success: true, data: order });
  } catch (err) {
    if (err.name === 'CastError') {
      const e = new Error('Invalid order id');
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

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id).lean();
    if (!order) {
      const e = new Error('Order not found');
      e.statusCode = 404;
      return next(e);
    }
    res.json({ success: true, message: 'Order deleted', data: order });
  } catch (err) {
    if (err.name === 'CastError') {
      const e = new Error('Invalid order id');
      e.statusCode = 400;
      return next(e);
    }
    next(err);
  }
};
