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
router.post('/createNewBook', authMiddleware, createNewBook);
router.post('/getAllBooksSortName', authMiddleware, getAllBooksSortName);
router.post('/getAllBooksSortDate', authMiddleware, getAllBooksSortDate);
router.post('/getBooksFilterSubstring', authMiddleware, getBooksFilterSubstring);
router.patch('/editBook', authMiddleware, editBook);
router.delete('/deleteBook', authMiddleware, deleteBook);

const {
  signIn,
  createNewUser
} = require('../controllers/user.controller');

router.post('/signIn', signIn);
router.post('/createNewUser', createNewUser);

const {
  refreshTokens
} = require('../controllers/token.controller');

router.post ('/refresh-tokens', refreshTokens)

module.exports = router;