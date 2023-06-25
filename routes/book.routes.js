const express = require('express');
const router = express.Router();
const BookController = require('../controllers/book.controller');

router.post('/add', BookController.addNewBook);

module.exports = router;
