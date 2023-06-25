const db = require('../models/index');
const bookModel = 'book';

const BookRepository = {
  /**
   * Function to create a new record to table 'book'
   *
   * @param {Object} book: book details object
   * @returns an object containing newly created book details
   */
  createNewBook: async (book) => {
    const transaction = await db.sequelize.transaction();
    try {
      const newBook = await db[bookModel].create(book, { transaction });

      await transaction.commit();

      return newBook;
    } catch (error) {
      await transaction.rollback();
      throw new Error(`Internal server error occurred while creating a new book: ${error.message}`);
    }
  },

  /**
   * Function to fetch a record from table "book" by column "title"
   *
   * @param {String} title: title of the book
   * @returns an object of book details if exists, else null
   */
  getBookByTitle: async (title) => {
    try {
      return await db[bookModel].findOne({
        where: {
          title: title,
        },
      });
    } catch (error) {
      throw new Error(`Internal server error occurred while getting a book by title: ${error.message}`);
    }
  },

  /**
   * Function to fetch a record from table "book" by column "isbn"
   *
   * @param {String} isbn: isbn code of the book
   * @returns an object of book details if exists, else null
   */
  getBookByIsbn: async (isbn) => {
    try {
      return await db[bookModel].findOne({
        where: {
          isbn: isbn,
        },
      });
    } catch (error) {
      throw new Error(`Internal server error occurred while getting a book by ISBN code: ${error.message}`);
    }
  },
};

module.exports = BookRepository;
