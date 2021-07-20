const express = require('express');
const router = express.Router();
const authMiddleware = require('../../../middleware/auth')

const {
  getAllBooks,
  getOneBook,
  createNewBook,
  editBook,
  deleteBook,
  softDeleteBook
} = require('../controllers/book.controller');

router.get('/getAllBooks', authMiddleware, getAllBooks);
router.get('/getOneBook', authMiddleware, getOneBook);
router.post('/createNewBook', authMiddleware, createNewBook);
router.put('/editBook', authMiddleware, editBook);
router.delete('/deleteBook', authMiddleware, deleteBook);
router.delete('/softDeleteBook', authMiddleware, softDeleteBook);

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