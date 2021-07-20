const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken');
const {jwtSecret, tokens} = require('../../../config/keys').jwt;

const Token = require('../../db/models/token/index');

const generateAccessToken = (userId) => {
  const payload = {
    userId,
    type: tokens.access.type,
  };
  const options = {expiresIn: tokens.access.expiresIn};

  return jwt.sign(payload, jwtSecret, options);
};

const generateRefreshToken = () => {
  const payload = {
    id: uuid(),
    type: tokens.refresh.type,
  };
  const options = {expiresIn: tokens.refresh.expiresIn};

  return {
    id: payload.id,
    token: jwt.sign(payload, jwtSecret, options)
  };
};

const replaceDbRefreshToken = async (tokenId, userId) => {
  await Token.findOneAndDelete({userId});
  await Token.create({tokenId, userId});
}

const updateTokens = async (userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken();
  await replaceDbRefreshToken(refreshToken.id, userId);
  return {
    accessToken,
    refreshToken: refreshToken.token
  };
}

module.exports = updateTokens;
