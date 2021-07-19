const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
    getAllBooks,
    createNewBook,
    editBook,
    deleteBook,
    getAllBooksSortName,
    getAllBooksSortDate,
    getBooksFilterSubstring
} = require('../controllers/book.controller');

// router.get('/getAllBooks', passport.authenticate('jwt',{session: false}), getAllBooks);
// router.post('/createNewBook', passport.authenticate('jwt',{session: false}), createNewBook);
// router.post('/getAllBooksSortName', passport.authenticate('jwt',{session: false}), getAllBooksSortName);
// router.post('/getAllBooksSortDate', passport.authenticate('jwt',{session: false}), getAllBooksSortDate);
// router.post('/getBooksFilterSubstring', passport.authenticate('jwt',{session: false}), getBooksFilterSubstring);
// router.patch('/editBook', passport.authenticate('jwt',{session: false}), editBook);
// router.delete('/deleteBook', passport.authenticate('jwt',{session: false}), deleteBook);

router.get('/getAllBooks', passport.authenticate('jwt',{session: false}), getAllBooks);
router.post('/createNewBook', createNewBook);
router.post('/getAllBooksSortName', getAllBooksSortName);
router.post('/getAllBooksSortDate', getAllBooksSortDate);
router.post('/getBooksFilterSubstring', getBooksFilterSubstring);
router.patch('/editBook', editBook);
router.delete('/deleteBook', deleteBook);


const {
    createNewUser,
    authUser
} = require('../controllers/user.controller');

router.post('/createNewUser', createNewUser);
router.post('/authUser', authUser);

module.exports = router;