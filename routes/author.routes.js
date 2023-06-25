const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/author.controllers');

router.post('/register', AuthorController.registerNewAuthor);
router.post('/login', AuthorController.authorLogin);

module.exports = router;
