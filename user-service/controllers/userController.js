const User = require('../models/User');

exports.listUsers = async (req, res, next) => {
  try {
    const users = await User.find().lean();
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};



exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    if (err.code === 11000) {
      const e = new Error('Email already exists');
      e.statusCode = 409;
      return next(e);
    }
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!user) {
      const e = new Error('User not found');
      e.statusCode = 404;
      return next(e);
    }
    res.json({ success: true, data: user });
  } catch (err) {
    if (err.name === 'CastError') {
      const e = new Error('Invalid user id');
      e.statusCode = 400;
      return next(e);
    }
    if (err.code === 11000) {
      const e = new Error('Email already exists');
      e.statusCode = 409;
      return next(e);
    }
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean();
    if (!user) {
      const e = new Error('User not found');
      e.statusCode = 404;
      return next(e);
    }
    res.json({ success: true, message: 'User deleted', data: user });
  } catch (err) {
    if (err.name === 'CastError') {
      const e = new Error('Invalid user id');
      e.statusCode = 400;
      return next(e);
    }
    next(err);
  }
};
