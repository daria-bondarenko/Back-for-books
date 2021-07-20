const _ = require('underscore');
const Book = require('../../db/models/book/index');

module.exports.getAllBooks = async (req, res) => {
  const {sortby, dir, search, show = 10, page = 0} = req.query;
  let resultSort;
  let resultSearch;

  if (search) {
    const allBooks = await Book.find({removed: false});
    resultSearch = _.filter(allBooks, (arr) => {
      return arr.name.includes(search)
    })
  } else {
    resultSearch = await Book.find({removed: false});
  }

  if (sortby === "name" ||
    sortby === "author" ||
    sortby === "year" ||
    sortby === "genre"
  ) {
    if (dir === "desc") {
      const ascSort = _.sortBy(resultSearch, `${sortby}`);
      resultSort = ascSort.reverse()
    } else {
      resultSort = _.sortBy(resultSearch, `${sortby}`);
    }
  } else {
    resultSort = resultSearch
  }

  const paginationArray = _.chunk(resultSort, show);
  const result = paginationArray[page];

  res.send({data: result, meta: {total: resultSort.length, show, page: page + 1}});
};

module.exports.getOneBook = async (req, res) => {
  console.log(req.query)
  const {_id} = req.query;
  const result = await Book.find({_id});
  if (result.removed) {
    res.send({data: []});
  } else {
    res.send({data: result});
  }

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
          Book.find({_id}).then(result => {
            res.send({data: result})
          })
        })
      }
    }
  } else {
    Book.find({_id}).then(result => {
      res.send({data: result})
    })
  }
};

module.exports.deleteBook = (req, res) => {
  Book.deleteOne({_id: req.query._id}).then(result => {
    Book.find({removed: false}).then(result => {
      res.send({data: result});
    })
  })
};

module.exports.softDeleteBook = (req, res) => {
  Book.findOneAndUpdate({_id: req.query._id}, {removed: true}).then(result => {
    Book.find({removed: false}).then(result => {
      res.send({data: result});
    })
  })
};