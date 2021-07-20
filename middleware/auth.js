const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/keys').jwt;

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    res.status(401).json({message: 'Токен где?'});
    return;
  }

  const token = authHeader.replace('Bearer ', '');
  try {
   const payload = jwt.verify(token, jwtSecret);
   if (payload.type !== 'access') {
     res.status(401).json({message: 'Невалидный токен'});
     return;
   }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(401).json({message: 'Токен истек'});
      return;
    }
    if (e instanceof jwt.JsonWebTokenError) {
      res.status(401).json({message: 'Невалидный токен'});
      return;
    }
  }

  next();
}