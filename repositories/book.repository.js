const pool = require('../config/conn');

const BookRepository = {
  /**
   * Function to create a new record to table 'book'
   *
   * @param {Object} book: book details object
   * @returns an object containing newly created book details
   */
  createNewBook: async (book) => {
    try {
      const newBook = await pool.query(`INSERT INTO book ("bookId", "title", "authorId", "category", "isbn", "likes") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [
        book.bookId,
        book.title,
        book.authorId,
        book.category,
        book.isbn,
        book.likes,
      ]);

      return newBook.rows[0];
    } catch (error) {
      throw new Error(`Internal server error occurred while creating a new book: ${error.message}`);
    }
  },

  /**
   * Function to fetch a record from table "book" by column "bookId"
   *
   * @param {String} bookId: id of the book
   * @returns an object of book details if exists, else null
   */
  getBookById: async (bookId) => {
    try {
      const book = await pool.query('SELECT * FROM book WHERE "bookId" = $1', [bookId]);

      return book.rows[0];
    } catch (error) {
      throw new Error(`Internal server error occurred while getting a book by book id: ${error.message}`);
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
      const book = await pool.query('SELECT * FROM book WHERE "title" = $1', [title]);

      return book.rows[0];
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
      const book = await pool.query('SELECT * FROM book WHERE "isbn" = $1', [isbn]);

      return book.rows[0];
    } catch (error) {
      throw new Error(`Internal server error occurred while getting a book by ISBN code: ${error.message}`);
    }
  },

  /**
   * Function to update existing record in table 'book'
   *
   * @param {Object} book: book details object
   */
  updateBookDetails: async (book) => {
    try {
      await pool.query('UPDATE book SET "bookId" = $1, "title" = $2, "authorId" = $3, "category" = $4, "isbn" = $5, "likes" = $6', [
        book.bookId,
        book.title,
        book.authorId,
        book.category,
        book.isbn,
        book.likes,
      ]);
    } catch (error) {
      throw new Error(`Internal server error occurred while updating book details: ${error.message}`);
    }
  },

  getAllBooksByAuthor: async (authorId) => {
    try {
      const books = await pool.query('SELECT * FROM book WHERE "authorId" = $1 ORDER BY "likes" DESC', [authorId]);

      return books.rows;
    } catch (error) {
      throw new Error(`Internal server error occurred while fetching book details by author id: ${error.message}`);
    }
  },
};

module.exports = BookRepository;
