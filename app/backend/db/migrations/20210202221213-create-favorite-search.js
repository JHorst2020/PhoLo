'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("FavoriteSearches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
        },
      },
      searchDescription: {
        type: Sequelize.STRING,
      },
      dateRangeStart: {
        type: Sequelize.DATE,
      },
      dateRangeEnd: {
        type: Sequelize.DATE,
      },
      latitude: {
        type: Sequelize.DOUBLE,
      },
      longitude: {
        type: Sequelize.DOUBLE,
      },
      notification: {
        type: Sequelize.BOOLEAN,
      },
      radius: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FavoriteSearches');
  }
};