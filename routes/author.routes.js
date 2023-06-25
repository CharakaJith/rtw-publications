const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/author.controllers');

router.post('/register', AuthorController.registerNewAuthor);

module.exports = router;
