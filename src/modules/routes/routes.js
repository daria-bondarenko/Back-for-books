const express = require('express');
const router = express.Router();
const path = require("path");
const authMiddleware = require('../../../middleware/auth');

const multer = require("multer");
const uuid4 = require("uuid").v4;
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../../public/uploads"),
  filename: (req, file, cb) => {
    const fullName =
      "blog_" + uuid4().replace(/-/g, "") + path.extname(file.originalname);
    cb(null, fullName);
  },
});
const upload = multer({ storage: storage });

const {
  getAllBooks,
  getOneBook,
  createNewBook,
  editBook,
  deleteBook
} = require('../controllers/book.controller');

router.get('/getAllBooks', authMiddleware, getAllBooks);
router.get('/getOneBook', authMiddleware, getOneBook);
router.post('/createNewBook', authMiddleware, upload.single("photo"), createNewBook);
router.put('/editBook', authMiddleware, editBook);
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