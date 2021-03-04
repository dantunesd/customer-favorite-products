function notFoundHandler(req, res, next) {
  if (!res.headersSent) {
    return res.status(404).send('Not Found');
  }
  return next();
}

module.exports = notFoundHandler;
