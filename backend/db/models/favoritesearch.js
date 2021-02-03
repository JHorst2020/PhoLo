'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteSearch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FavoriteSearch.belongsTo(models.User,{foreignKey:"user_id"})
    }
  };
  FavoriteSearch.init({
    user_id: DataTypes.INTEGER,
    searchDescription: DataTypes.STRING,
    dateRangeStart: DataTypes.DATE,
    dateRangeEnd: DataTypes.DATE,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    notification: DataTypes.BOOLEAN,
    radius: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FavoriteSearch',
  });
  return FavoriteSearch;
};