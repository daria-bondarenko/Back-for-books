require('dotenv').config();

module.exports = {
  jwt: {
    jwtSecret: process.env.jwtSecret,
    tokens: {
      access: {
        type: 'access',
        expiresIn: process.env.timeForAccessToken
      },
      refresh: {
        type: 'refresh',
        expiresIn: process.env.timeForRefreshToken
      }
    }
  }

}