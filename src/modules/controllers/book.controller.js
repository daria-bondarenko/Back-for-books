const _ = require('underscore');
const Book = require('../../db/models/book/index');


module.exports.getAllBooks = async (req, res) => {
  const result = await Book.find({});
  res.send({data: result});
};

module.exports.getAllBooksSortName = async (req, res) => {
  if (req.body.direction === 'asc') {
    const allBooks = await Book.find({});
    const asc = _.sortBy(allBooks, 'name');
    res.send({data: asc});
  }
  if (req.body.direction === 'desc') {
    const allBooks = await Book.find({});
    const asc = _.sortBy(allBooks, 'name');
    const desc = asc.reverse()
    res.send({data: desc});
  }
};

module.exports.getAllBooksSortDate = async (req, res) => {
  if (req.body.direction === 'asc') {
    const allBooks = await Book.find({});
    const asc = _.sortBy(allBooks, 'date');
    res.send({data: asc});
  }
  if (req.body.direction === 'desc') {
    const allBooks = await Book.find({});
    const asc = _.sortBy(allBooks, 'date');
    const desc = asc.reverse()
    res.send({data: desc});
  }
};

module.exports.getBooksFilterSubstring = async (req, res) => {
  console.log(req.body);
  const allBooks = await Book.find({});
  const result = _.filter(allBooks, function(arr){ return arr.name.includes(req.body.ourSubstr)})
  res.send({data: result});
};

module.exports.createNewBook = (req, res) => {
  const book = new Book({
    name: req.body.name,
    author: req.body.author,
    date: req.body.date,
    genre: req.body.genre
  });
  book.save().then(result => {
    Book.find({}).then(result => {
      res.send({data: result});
    });
  });
};

module.exports.editBook = (req, res) => {
  const {_id} = req.body;

  if ((req.body.hasOwnProperty('_id')
    && (req.body.hasOwnProperty('name')
      || req.body.hasOwnProperty('author')
      || req.body.hasOwnProperty('date')
      || req.body.hasOwnProperty('genre')))) {
    for (let key in req.body) {
      if ((key === 'name' ||
        key === 'author' ||
        key === 'date' ||
        key === 'genre') &&
        (req.body[key])) {
        Book.updateOne({_id}, {[key]: req.body[key]}
        ).then(result => {
          Book.find({}).then(result => {
            res.send({data: result})
          })
        })
      }
    }
  } else {
    Book.find({}).then(result => {
      res.send({data: result})
    })
  }
};

module.exports.deleteBook = (req, res) => {
  Book.deleteOne({_id: req.query._id}).then(result => {
    Book.find({}).then(result => {
      res.send({data: result});
    })
  })
};