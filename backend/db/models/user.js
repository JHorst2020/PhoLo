"use strict";
const { Model, Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email, profileImageUrl, firstName, lastName, phoneNumber } = this; // context will be the User instance
      return { id, username, email, profileImageUrl, firstName, lastName, phoneNumber };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require("sequelize");
      const user = await User.scope("loginUser").findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope("currentUser").findByPk(user.id);
      }
    }
    static async loginPhone({ phoneNumber }) {
      // const { Op } = require("sequelize");
    console.log("This is the phone numberasdf:   ", phoneNumber);

      const user = await User.scope("loginUser").findOne({
        where: {
            phoneNumber: phoneNumber
        },
      });
      if (user) {
        return await User.scope("currentUser").findByPk(user.id);
      }
    }
    static async signup({ username, email, password, profileImageUrl, firstName, lastName, phoneNumber }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
        profileImageUrl,
        firstName,
        lastName,
        phoneNumber,
      });

      return await User.scope("currentUser").findByPk(user.id);
    }
    static associate(models) {
      // define association here
      User.hasMany(models.Photo, {foreignKey:"user_id"})
      User.hasMany(models.FavoriteSearch, {foreignKey:"user_id"})
      User.hasMany(models.PhotoTag, {foreignKey:"user_id"})
      User.hasMany(models.Bookmark, {foreignKey:"user_id"})
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      profileImageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};

