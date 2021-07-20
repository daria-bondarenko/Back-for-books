const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../../../config/keys').jwt;
const updateTokens = require('../helpers/helpersFunction');

const Token = require('../../db/models/token/index');

module.exports.refreshTokens = async (req, res) => {
  const {refreshToken} = req.body;
  let payload;
  try {
    payload = jwt.verify(refreshToken, jwtSecret);
    if (payload.type !== 'refresh') {
      res.status(400).json({message: 'Токен не подходит'});
      return;
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(400).json({message: 'Токен истек'});
      return;
    } else if (e instanceof jwt.JsonWebTokenError) {
      res.status(400).json({message: 'Не подходит токен'});
      return;
    }
  }

  const token = await Token.findOne({tokenId: payload.id});
  let tokens;
  if (token === null) {
    throw new Error('Невалидный токен');
  } else {
    tokens = await updateTokens(token.userId);
    try {
      res.json(tokens);
    } catch (e) {
      res.status(400).json({message: err.message})
    }
  }
}