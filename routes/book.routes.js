const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authenticate');
const BookController = require('../controllers/book.controller');

router.post('/add', authenticate, BookController.addNewBook);
router.get('/get/:isbn', BookController.getBookByIsbnCode);

module.exports = router;
