const _ = require('underscore');
const Book = require('../../db/models/book/index');

module.exports.getAllBooks = async (req, res) => {
  const {sortby = "", dir = "asc", search, show = 10, page = 0} = req.query;
  let resultArr = await Book.find({removed: false});

  try {
    if (search &&
      sortby === "name" ||
      "author" ||
      "year" ||
      "genre") {
      if (dir === "desc") {
        resultArr = await Book.find({removed: false, name: {$regex: `${search}`}}).sort({[search]: 'desc'});
      } else {
        resultArr = await Book.find({removed: false, name: {$regex: `${search}`}}).sort({[search]: 'asc'});
      }
    }

    if (search &&
      sortby !== "name" &&
      "author" &&
      "year" &&
      "genre") {
      resultArr = await Book.find({removed: false, name: {$regex: `${search}`}})
    }

    if (!search &&
      sortby === "name" ||
      "author" ||
      "year" ||
      "genre") {
      if (dir === "desc") {
        resultArr = await Book.find({removed: false}).sort({[search]: 'desc'});
      } else {
        resultArr = await Book.find({removed: false}).sort({[search]: 'asc'});
      }
    }

    const paginationArray = _.chunk(resultArr, show);
    const resultArrChunk = paginationArray[page];

    res.send({data: resultArrChunk, meta: {total: resultArr.length, show, page: page + 1}});
  } catch (e) {
    res.status(400).json({message: "Что-то пошло не так :("})
  }

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
  const {name, author, year, genre} = req.body;
  const {filename} = req.file;

  const book = new Book({
    name,
    author,
    year: Number(year),
    genre,
    removed: false,
    img: "/uploads/" + filename
  });
  book.save().then(result => {
    Book.find({removed: false}).then(result => {
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
  Book.findOneAndUpdate({_id: req.query._id}, {removed: true}).then(result => {
    Book.find({removed: false}).then(result => {
      res.send({data: result});
    })
  })
};