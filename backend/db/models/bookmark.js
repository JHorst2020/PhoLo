'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookmark.belongsTo(models.Photo, { foreignKey: "photo_id" });
      Bookmark.belongsTo(models.User, { foreignKey: "user_id" });

    }
  };
  Bookmark.init({
    user_id: DataTypes.INTEGER,
    photo_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};