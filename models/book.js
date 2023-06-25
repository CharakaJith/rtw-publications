'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  book.init(
    {
      bookId: DataTypes.STRING,
      title: DataTypes.STRING,
      authorId: DataTypes.STRING,
      category: DataTypes.STRING,
      isbn: DataTypes.STRING,
      likes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'book',
      freezeTableName: true,
    }
  );

  return book;
};
