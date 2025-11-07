const User = require('../models/user');

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .orFail(() => {
        const error = new Error('Usuario no encontrado');
        error.statusCode = 404;
        throw error;
      });
    return res.status(200).json(user);
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }
    return res.status(500).json({ message: 'Error del servidor' });
  }
}

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado.' });
    }
    return res.send(user);
  } catch (err) {
    return next ? next(err) : res.status(500).send({ message: 'Error del servidor.' });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    ).orFail(() => {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error.name === 'validationError') {
      return res.status(400).json({ message: 'Datos invalidados para actualizar' });
    }
    if (error.statusCode === 404) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports.updateAvatar = async (req, res) => {
  try {
    const {avatar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    ).orFail(() => {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error.name === 'validationError') {
      return res.status(400).json({ message: 'Datos invalidados para actualizar' });
    }
    if (error.statusCode === 404) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(500).json({ message: 'Error del servidor' });
  }
};