const pool = require('../config/conn');

const AuthorRepository = {
  /**
   * Function to create a new record to table 'author'
   *
   * @param {Object} author: author details object
   * @returns an object containing newly created author details
   */
  createNewAuthor: async (author) => {
    try {
      const newAuthor = await pool.query(`INSERT INTO author ("authorId", "firstName", "lastName", "email", "mobile", "password") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [
        author.authorId,
        author.firstName,
        author.lastName,
        author.email,
        author.mobile,
        author.password,
      ]);

      return {
        id: newAuthor.rows[0].id,
        authorId: newAuthor.rows[0].authorId,
        firstName: newAuthor.rows[0].firstName,
        lastName: newAuthor.rows[0].lastName,
        email: newAuthor.rows[0].email,
        mobile: newAuthor.rows[0].mobile,
      };
    } catch (error) {
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
      const author = await pool.query('SELECT * FROM author WHERE "email" = $1', [email]);

      return author.rows[0];
    } catch (error) {
      throw new Error(`Internal server error occurred while getting author by email: ${error.message}`);
    }
  },

  /**
   * Funtion to fetch a record from table "author" by column "authorId"
   *
   * @param {String} authorId: id of the author
   * @returns an object of author details if exists, else null
   */
  getAuthorById: async (authorId) => {
    try {
      const author = await pool.query('SELECT "authorId", "firstName", "lastName", "email", "mobile" FROM author WHERE "authorId" = $1', [authorId]);

      return author.rows[0];
    } catch (error) {
      throw new Error(`Internal server error occurred while getting author by author id: ${error.message}`);
    }
  },

  /**
   * Function to fetch all records from the table "author"
   *
   * @returns a list of author detail objects
   */
  getAllAuthors: async () => {
    try {
      const authors = await pool.query('SELECT * FROM author');

      return authors.rows;
    } catch (error) {
      throw new Error(`Internal server error occurred while getting all authors details: ${error.message}`);
    }
  },
};

module.exports = AuthorRepository;
