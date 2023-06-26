const bcrypt = require('bcrypt');
const Validator = require('../util/validator');
const JwtGenerator = require('../util/jwtGenerator');
const ExposableIdGenerator = require('../common/ExposableIdGenerator');
const AuthorRepository = require('../repositories/author.repository');

const AuthorService = {
  registerNewAuthor: async (data) => {
    try {
      const { firstName, lastName, email, mobile, password } = data;

      // validate user inputs
      await Validator.validateUserInputs.validateName(firstName, 'first name');
      await Validator.validateUserInputs.validateName(lastName, 'last name');
      await Validator.validateUserInputs.checkIfEmptyString(password, 'password');
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

  authorLogin: async (data) => {
    try {
      const { email, password } = data;

      // validate user inputs
      await Validator.validateUserInputs.validateEmail(email);
      await Validator.validateUserInputs.checkIfEmptyString(password, 'password');

      // check author exists
      const author = await AuthorRepository.getAuthorByEmail(email);
      if (!author) {
        throw new Error('Email is not registered!');
      }

      // validate password
      const isValidPassword = await bcrypt.compare(password, author.password);
      if (!isValidPassword) {
        throw new Error('Invalid password!');
      }

      // generate access token
      const tokenUser = {
        tokenUserId: author.authorId,
        tokenUserName: `${author.firstName} ${author.lastName}`,
        tokenUserEmail: author.email,
      };
      const accessToken = await JwtGenerator.generateNewAccessToken(tokenUser);

      const authorDetails = {
        id: author.id,
        authorId: author.authorId,
        firstName: author.firstName,
        lastName: author.lastName,
        email: author.email,
        mobile: author.mobile,
      };

      return { authorDetails, accessToken };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = AuthorService;