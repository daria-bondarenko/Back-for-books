module.exports = {
  jwt: {
    jwtSecret: 'hello world',
    tokens: {
      access: {
        type: 'access',
        expiresIn: '55m'
      },
      refresh: {
        type: 'refresh',
        expiresIn: '3h'
      }
    }
  }

}