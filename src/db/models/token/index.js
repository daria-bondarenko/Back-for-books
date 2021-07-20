const mongoose = require('mongoose');

const {Schema} = mongoose;

const tokenScheme = new Schema({
  tokenId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

module.exports = Token = mongoose.model('tokens', tokenScheme);