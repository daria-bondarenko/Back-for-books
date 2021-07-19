const Book = require('../../db/models/book/index');

module.exports.getAllBooks = async (req, res) => {
    const result = await Book.find({});
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