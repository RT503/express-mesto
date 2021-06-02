const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: { // ссылка на модель автора карточки
    type: ObjectId,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
    // •	likes — список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив (поле default);
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoos.model('card', cardSchema);
