const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const SALT_ROUNDS = 10;

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Trae el usuario e incluye password por si luego lo ocultamos con select:false (Punto 10)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).send({ message: 'Email o contraseña incorrectos.' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).send({ message: 'Email o contraseña incorrectos.' });
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' }
    );

    return res.send({ token }); // Enviar token en el cuerpo de la respuesta
  } catch (err) {
  return next(err);
}
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {email, password } = req.body;

    // hash de la contraseña
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    // crea usuario (si name/about/avatar vienen vacíos se aplican defaults del schema)
    const user = await User.create({
  
      email,
      password: hash,
    });

    // respondemos sin incluir password
    return res.status(201).send({
      _id: user._id,
      email: user.email,
    });
  } catch (err) {
  if (err.code === 11000) {
    err.statusCode = 409;
    err.message = 'El email ya está registrado.';
  } else if (err.name === 'ValidationError') {
    err.statusCode = 400;
    err.message = 'Datos de usuario inválidos.';
  }
  return next(err);
}
};

