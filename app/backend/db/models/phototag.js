'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhotoTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PhotoTag.belongsTo(models.Photo,{foreignKey:"photo_id"})
      PhotoTag.belongsTo(models.User,{foreignKey:"user_id"})
    }
  };
  PhotoTag.init({
    user_id: DataTypes.INTEGER,
    photo_id: DataTypes.INTEGER,
    tagName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PhotoTag',
  });
  return PhotoTag;
};