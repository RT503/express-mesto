const Card = require('../models/card');

const CAST_ERROR_CODE = 400;
const CANNOT_FIND_ERROR_CODE = 404;
const DEFAULT_ERROR_CODE = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(CAST_ERROR_CODE).send({ message: 'Неправильный формат входных данных' });
      res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(CANNOT_FIND_ERROR_CODE).send({ message: 'Неправильный формат входных данных' });
      if (err.name === 'CastError') return res.status(CAST_ERROR_CODE).send({ message: 'Неправильный формат входных данных' });
      res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      (res.status(CANNOT_FIND_ERROR_CODE).send({ message: 'Нет карточки с таким ID' }));
    })
    .then(() => res.send({ message: 'Удаление прошло успешно' }))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(CAST_ERROR_CODE).send({ message: 'Неправильный формат входных данных' });
      res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      (res.status(CANNOT_FIND_ERROR_CODE).send({ message: 'Нет карточки с таким ID' }));
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(CAST_ERROR_CODE).send({ message: 'Неправильный формат входных данных' });
      res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      (res.status(CANNOT_FIND_ERROR_CODE).send({ message: 'Нет карточки с таким ID' }));
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(CAST_ERROR_CODE).send({ message: 'Неправильный формат входных данных' });
      res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};
