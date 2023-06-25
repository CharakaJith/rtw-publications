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
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};

module.exports = AuthorController;
