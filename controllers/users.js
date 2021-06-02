const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users}))
    .catch(() => {res.status(500).send({ message: 'Произошла ошибка!'})})
}

module.exports.addUser = (req, res) => {

  const { name, age, avatar } = res.body;

  User.create({ name, age, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message}));
};
