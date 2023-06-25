const bcrypt = require('bcrypt');
const Validator = require('../util/validator');
const ExposableIdGenerator = require('../common/ExposableIdGenerator');
const AuthorRepository = require('../repositories/author.repository');

const AuthorService = {
  registerNewAuthor: async (data) => {
    try {
      const { firstName, lastName, email, mobile, password } = data;

      // validate user inputs
      await Validator.validateUserInputs.checkIfEmptyString(firstName, 'First name');
      await Validator.validateUserInputs.checkIfEmptyString(lastName, 'Last name');
      await Validator.validateUserInputs.checkIfEmptyString(password, 'Password');
      await Validator.validateUserInputs.validateEmail(email);
      await Validator.validateUserInputs.validateMobileNumber(mobile);

      // check if email exists
      const author = await AuthorRepository.getAuthorByEmail(email);
      if (author) {
        throw new Error('This email is already registered!');
      }

      // hash password
      const encryptedPassword = await bcrypt.hash(password, 10);
      const authorId = ExposableIdGenerator.EXPOSABLE_ID_AUTHOR();

      // create new author
      const authorDetails = {
        authorId: authorId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: mobile,
        password: encryptedPassword,
      };
      const newAuthor = await AuthorRepository.createNewAuthor(authorDetails);

      return newAuthor;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = AuthorService;
