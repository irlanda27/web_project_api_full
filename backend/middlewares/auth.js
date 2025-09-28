const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).send({ message: 'Autorización requerida.' });
  }

  // Espera formato: "Bearer <token>"
  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
    );
    req.user = payload; // ✅ payload con {_id: ...}
    return next();
  } catch (err) {
    return res.status(403).send({ message: 'Token inválido o caducado.' });
  }
};