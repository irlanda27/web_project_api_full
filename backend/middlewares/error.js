module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = status === 500 ? 'Error interno del servidor' : (err.message || 'Error');
  res.status(status).send({ message });
};