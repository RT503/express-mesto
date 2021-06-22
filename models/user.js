const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return v <= 2;
      },
      message: 'Некорректные данные переданы',
    },
  },
  about: {
    type: String,
    required: true,
    minlegth: 2,
    mixlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
