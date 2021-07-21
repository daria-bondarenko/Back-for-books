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
  year: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  removed: {
    type: Boolean,
    required: true
  },
  img: {
    type: String,
    required: true
  }
});

module.exports = Book = mongoose.model('books', bookScheme);