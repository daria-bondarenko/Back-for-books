const express = require('express');
const router = express.Router();
// const passport = require('passport');

const {
    getAllBooks,
    createNewBook,
    editBook,
    deleteBook
} = require('../controllers/book.controller');

router.get('/getAllBooks', getAllBooks);
router.post('/createNewBook', createNewBook);
router.patch('/editBook', editBook);
router.delete('/deleteBook', deleteBook);

const {
    createNewUser,
    authUser
} = require('../controllers/user.controller');

router.post('/createNewUser', createNewUser);
router.post('/authUser', authUser);

module.exports = router;