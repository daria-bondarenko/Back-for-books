const express = require('express');
const router = express.Router();
const authMiddleware = require('../../../middleware/auth')


const {
  getAllBooks,
  createNewBook,
  editBook,
  deleteBook,
  getAllBooksSortName,
  getAllBooksSortDate,
  getBooksFilterSubstring
} = require('../controllers/book.controller');

router.get('/getAllBooks', authMiddleware, getAllBooks);
router.post('/createNewBook', createNewBook);
router.post('/getAllBooksSortName', getAllBooksSortName);
router.post('/getAllBooksSortDate', getAllBooksSortDate);
router.post('/getBooksFilterSubstring', getBooksFilterSubstring);
router.patch('/editBook', editBook);
router.delete('/deleteBook', deleteBook);

const {
  signIn
} = require('../controllers/user.controller');

router.post('/signIn', signIn);

module.exports = router;