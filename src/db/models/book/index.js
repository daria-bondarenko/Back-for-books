const mongoose = require('mongoose');

const {Schema} = mongoose;

const bookScheme = new Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  }
});

module.exports = Record = mongoose.model('books', bookScheme);