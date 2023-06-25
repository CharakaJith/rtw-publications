const db = require('../models/index');
const authorModel = 'author';

const AuthorRepository = {
  /**
   * Function to create a new record to table 'author'
   *
   * @param {Object} author: author details object
   * @returns an object containing newly created author details
   */
  createNewAuthor: async (author) => {
    const transaction = await db.sequelize.transaction();
    try {
      const newAuthor = await db[authorModel].create(author, { transaction });

      await transaction.commit();

      return {
        id: newAuthor.id,
        authorId: newAuthor.authorId,
        firstName: newAuthor.firstName,
        lastName: newAuthor.lastName,
        email: newAuthor.email,
        mobile: newAuthor.mobile,
      };
    } catch (error) {
      await transaction.rollback();
      throw new Error(`Internal server error occurred while creating a new author: ${error.message}`);
    }
  },

  /**
   * Funtion to fetch a record from table "author" by column "email"
   *
   * @param {String} email: email of the author
   * @returns an object of author details if exists, else null
   */
  getAuthorByEmail: async (email) => {
    try {
      return await db[authorModel].findOne({
        where: {
          email: email,
        },
      });
    } catch (error) {
      throw new Error(`Internal server error occurred while getting author by email: ${error.message}`);
    }
  },
};

module.exports = AuthorRepository;
