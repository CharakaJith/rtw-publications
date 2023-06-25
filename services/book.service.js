const Validator = require('../util/validator');
const ExposableIdGenerator = require('../common/ExposableIdGenerator');
const BookRepository = require('../repositories/book.repository');
const AuthorRepository = require('../repositories/author.repository');

const BookService = {
  addNewBook: async (data) => {
    try {
      const { title, category, isbn, authorId } = data;

      // validate user inputs
      await Validator.validateBookDetails.validateTitle(title);
      await Validator.validateBookDetails.validateCategory(category);
      await Validator.validateBookDetails.validateIsbnCode(isbn);

      // check book title and isbn code
      const bookByTitle = await BookRepository.getBookByTitle(title);
      if (bookByTitle) {
        throw new Error(`There is already a book registered under the title ${title}`);
      }
      const bookByIsbn = await BookRepository.getBookByIsbn(isbn);
      if (bookByIsbn) {
        throw new Error(`There is already a book registered under the ISBN code ${isbn}`);
      }

      const bookId = ExposableIdGenerator.EXPOSABLE_ID_BOOK();

      const bookDetails = {
        bookId: bookId,
        title: title,
        authorId: authorId,
        category: category,
        isbn: isbn,
        likes: 0,
      };
      const newBook = await BookRepository.createNewBook(bookDetails);

      return newBook;
    } catch (error) {
      throw error;
    }
  },

  getBookByIsbnCode: async (data) => {
    try {
      const { isbn } = data;

      // validate isbn format
      await Validator.validateBookDetails.validateIsbnCode(isbn);

      // get book details
      const book = await BookRepository.getBookByIsbn(isbn);
      if (!book) {
        throw new Error('Unregistered ISBN code!');
      }

      // get author details
      const author = await AuthorRepository.getAuthorById(book.authorId);

      return { book, author };
    } catch (error) {
      throw error;
    }
  },

  addLikeForBook: async (data) => {
    try {
      const { bookId } = data;

      // validate user inputs
      await Validator.validateUserInputs.checkIfEmptyString(bookId, 'Book id');

      // check book exists
      const book = await BookRepository.getBookById(bookId);
      if (!book) {
        throw new Error('Invalid book id!');
      }

      // update likes
      const bookDetails = {
        bookId: bookId,
        likes: book.likes + 1,
      };
      await BookRepository.updateBookDetails(bookDetails);

      // get updated book details
      const updatedBook = await BookRepository.getBookById(bookId);

      return updatedBook;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = BookService;
