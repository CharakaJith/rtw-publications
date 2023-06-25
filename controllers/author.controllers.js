const logger = require('../middleware/logger/logger');
const AuthorService = require('../services/author.service');

const AuthorController = {
  registerNewAuthor: async (req, res) => {
    try {
      const { firstName, lastName, email, mobile, password } = req.body;

      const data = { firstName, lastName, email, mobile, password };

      const registerNewAuthorResponse = await AuthorService.registerNewAuthor(data);

      res.status(200).json({
        success: true,
        message: registerNewAuthorResponse,
      });

      logger('info', true, '200', `author ${email} registered`, req);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });

      logger('error', false, '500', error.message, req);
    }
  },
};

module.exports = AuthorController;
