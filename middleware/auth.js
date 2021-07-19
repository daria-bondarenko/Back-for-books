const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/keys');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    res.status(401).json({message: 'Токен где?'})
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    jwt.verify(token, jwtSecret);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      res.status(401).json({message: 'Твой токен - фуфло'})
    }
  }

  next();
}