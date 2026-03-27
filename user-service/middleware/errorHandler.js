function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  const status = err.statusCode || 500;
  const message =
    status === 500 && process.env.NODE_ENV !== 'development'
      ? 'Internal server error'
      : err.message || 'Internal server error';
  res.status(status).json({ success: false, message });
}

module.exports = errorHandler;
