const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-err');

const { JWT_SECRET } = process.env;

/*module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;

  next();
}*/

module.exports = (req, res, next) => {
  try {
    payload = jwt.verify(req.cookies.jwt, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(new UnauthorizedError('Неправильный токен авторизации'));
  }
}
