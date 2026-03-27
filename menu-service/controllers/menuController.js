const MenuItem = require('../models/MenuItem');

exports.listMenu = async (req, res, next) => {
  try {
    const items = await MenuItem.find().lean();
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};

exports.getMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id).lean();
    if (!item) {
      const e = new Error('Menu item not found');
      e.statusCode = 404;
      return next(e);
    }
    res.json({ success: true, data: item });
  } catch (err) {
    if (err.name === 'CastError') {
      const e = new Error('Invalid menu item id');
      e.statusCode = 400;
      return next(e);
    }
    next(err);
  }
};

exports.createMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.updateMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!item) {
      const e = new Error('Menu item not found');
      e.statusCode = 404;
      return next(e);
    }
    res.json({ success: true, data: item });
  } catch (err) {
    if (err.name === 'CastError') {
      const e = new Error('Invalid menu item id');
      e.statusCode = 400;
      return next(e);
    }
    next(err);
  }
};

exports.deleteMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id).lean();
    if (!item) {
      const e = new Error('Menu item not found');
      e.statusCode = 404;
      return next(e);
    }
    res.json({ success: true, message: 'Menu item deleted', data: item });
  } catch (err) {
    if (err.name === 'CastError') {
      const e = new Error('Invalid menu item id');
      e.statusCode = 400;
      return next(e);
    }
    next(err);
  }
};
