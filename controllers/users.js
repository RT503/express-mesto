const User = require('../models/user');

const CAST_ERROR_CODE = 400;
const CANNOT_FIND_ERROR_CODE = 404;
const DEFAULT_ERROR_CODE = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      (res.status(CANNOT_FIND_ERROR_CODE).send({ message: 'В базе данных нет пользователей' }));
    })
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(CAST_ERROR_CODE).send({ message: 'Неправильный формат входных данных' });
      res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      (res.status(CANNOT_FIND_ERROR_CODE).send({ message: 'Нет пользователя с таким ID' }));
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(CAST_ERROR_CODE).send({ message: 'Нет пользователя с таким ID' });
      res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(CANNOT_FIND_ERROR_CODE).send({ message: 'Неправильный формат входных данных' });
      if (err.name === 'CastError') return res.status(CAST_ERROR_CODE).send({ message: 'Неправильный формат входных данных' });
      res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true, upsert: true })
    .orFail(() => {
      (res.status(CANNOT_FIND_ERROR_CODE).send({ message: 'Нет пользователя с таким ID' }));
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(CANNOT_FIND_ERROR_CODE).send({ message: 'Неправильный формат входных данных' });
      if (err.name === 'CastError') return res.status(CAST_ERROR_CODE).send({ message: 'Неправильный формат входных данных' });
      res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true, upsert: true })
    .orFail(() => {
      (res.status(CANNOT_FIND_ERROR_CODE).send({ message: 'Нет пользователя с таким ID' }));
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(CANNOT_FIND_ERROR_CODE).send({ message: 'Неправильный формат входных данных' });
      if (err.name === 'CastError') return res.status(CAST_ERROR_CODE).send({ message: 'Неправильный формат входных данных' });
      res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};
