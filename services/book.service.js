const Validator = require('../util/validator');
const ExposableIdGenerator = require('../common/ExposableIdGenerator');
const BookRepository = require('../repositories/book.repository');

const BookService = {
  addNewBook: async (data) => {
    try {
      const { title, category, isbn, authorId } = data;

      // validate user inputs
      await Validator.validateBookDetails.validateTitle(title);
      await Validator.validateBookDetails.validateCategory(category);
      await Validator.validateBookDetails.validateIsbnCode(isbn);

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
};

module.exports = BookService;
