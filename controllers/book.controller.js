const logger = require('../middleware/logger/logger');
const BookService = require('../services/book.service');

const BookController = {
  addNewBook: async (req, res) => {
    try {
      const data = ({ title, category, isbn } = req.body);
      data.authorId = req.user.tokenUserId;

      const addNewBookResponse = await BookService.addNewBook(data);

      res.status(200).json({
        success: true,
        message: addNewBookResponse,
      });

      logger('info', true, '200', addNewBookResponse, req);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });

      logger('error', false, '500', error.message, req);
    }
  },

  getBookByIsbnCode: async (req, res) => {
    try {
      const data = ({ isbn } = req.params);

      const getBookResponse = await BookService.getBookByIsbnCode(data);

      res.status(200).json({
        success: true,
        message: getBookResponse,
      });

      logger('info', true, '200', `book ${isbn} details fetched`, req);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });

      logger('error', false, '500', error.message, req);
    }
  },

  addLikeForBook: async (req, res) => {
    try {
      const data = ({ bookId } = req.body);

      const addLikeResponse = await BookService.addLikeForBook(data);

      res.status(200).json({
        success: true,
        message: addLikeResponse,
      });

      logger('info', true, '200', `added a like for book ${bookId}`, req);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });

      logger('error', false, '500', error.message, req);
    }
  },
};

module.exports = BookController;
