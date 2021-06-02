const router = require('express').Router();
const User = require('../models/user');
const { getAllUsers, addUser } = require('../controllers/users');

router.get('/', (req, res) => {
  User.find({})
    .then((user) => res.send( {data: user}))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка '}));
});

router.post('/', (req, res) => {
  const { name, age, avatar } = req.body;
  User.create( {name, age, avatar})
    .then(user => res.send({data: user}))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
});

module.exports = router;
