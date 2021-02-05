'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static async uploadPhoto({})
    static associate(models) {
      // define association here
      Photo.belongsTo(models.User, {foreignKey:"user_id"})
      Photo.hasMany(models.PhotoTag,{foreignKey:"photo_id"})
      Photo.hasMany(models.Bookmark,{foreignKey:"photo_id"})
    }
  };
  Photo.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      locationName: DataTypes.STRING,
      streetNumber: DataTypes.STRING,
      streetName: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zipcode: DataTypes.STRING,
      photoTitle: DataTypes.STRING,
      description: DataTypes.STRING,
      photoUrl: DataTypes.STRING,
      photoThumbUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Photo",
    }
  );
  return Photo;
};