"use strict";
const faker = require("faker");

// export async function up(queryInterface, Sequelize) {
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Bookmarks",
      [
        {
          user_id: faker.random.number({ min: 1, max: 3 }),
          photo_id: faker.random.number({ min: 1, max: 40 }),
        },
        {
          user_id: faker.random.number({ min: 1, max: 3 }),
          photo_id: faker.random.number({ min: 1, max: 40 }),
        },
        {
          user_id: faker.random.number({ min: 1, max: 3 }),
          photo_id: faker.random.number({ min: 1, max: 40 }),
        },
        {
          user_id: faker.random.number({ min: 1, max: 3 }),
          photo_id: faker.random.number({ min: 1, max: 40 }),
        },
        {
          user_id: faker.random.number({ min: 1, max: 3 }),
          photo_id: faker.random.number({ min: 1, max: 40 }),
        },
        {
          user_id: faker.random.number({ min: 1, max: 3 }),
          photo_id: faker.random.number({ min: 1, max: 40 }),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("Bookmarks", null, {});
  },
};
