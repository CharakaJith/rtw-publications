const { phone } = require('phone');
const { BOOK_CATEGORY } = require('../enums/bookCategories');
const BookRepository = require('../repositories/book.repository');

const Validator = {
  validateUserInputs: {
    checkIfEmptyString: async (field, fieldName) => {
      if (!field || field.trim().length === 0) {
        throw new Error(`${fieldName} field is empty!`);
      }
    },

    validateName: async (field, fieldName) => {
      const nameFormat = /^[A-Za-z]+$/;

      if (!field || field.trim().length === 0) {
        throw new Error(`${fieldName} field is empty!`);
      }

      if (!String(field).match(nameFormat)) {
        throw new Error(`Invalid ${fieldName} format!`);
      }
    },

    validateEmail: async (email) => {
      const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!email || email.trim().length === 0) {
        throw new Error('Email field is empty!');
      }

      if (!String(email).match(emailformat)) {
        throw new Error('Invalid email format!');
      }
    },

    validateMobileNumber: async (mobile) => {
      if (!mobile || mobile.trim().length === 0) {
        throw new Error('Mobile number field is empty!');
      }

      const num = phone(mobile, { country: 'LK' });
      if (!num.isValid || mobile.charAt(0) !== '+') {
        throw new Error('Invalid mobile number format!');
      }
    },
  },

  validateBookDetails: {
    validateTitle: async (title) => {
      const titleFormat = /^[a-zA-Z0-9\s]+$/;

      if (!title || title.trim().length === 0) {
        throw new Error('Book title field is empty!');
      }

      if (!String(title).match(titleFormat)) {
        throw new Error('Invalid book title format!');
      }

      const book = await BookRepository.getBookByTitle(title);
      if (book) {
        throw new Error(`There is already a book registered under the title ${title}`);
      }
    },

    validateCategory: async (category) => {
      if (!category || category.trim().length === 0) {
        throw new Error('Book category field is empty!');
      }

      if (!Object.values(BOOK_CATEGORY).includes(category)) {
        throw new Error('Invalid book category!');
      }
    },

    validateIsbnCode: async (isbn) => {
      const isbnFormat = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;

      if (!isbn || isbn.trim().length === 0) {
        throw new Error('ISBN code field is empty!');
      }

      if (!String(isbn).match(isbnFormat)) {
        throw new Error('Invalid ISBN code format!');
      }

      const book = await BookRepository.getBookByIsbn(isbn);
      if (book) {
        throw new Error(`There is already a book registered under the ISBN code ${isbn}`);
      }
    },
  },
};

module.exports = Validator;
