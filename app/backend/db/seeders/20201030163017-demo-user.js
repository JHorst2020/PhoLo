"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          profileImageUrl:
            "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
          firstName: "Demo",
          lastName: "Lition",
          phoneNumber: 16052285633,
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: faker.internet.email(),
          username: "FakeUser1",
          profileImageUrl:
            "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
          firstName: "FakerFirst1",
          lastName: "FakerLast1",
          phoneNumber: 16052285634,
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        },
        {
          email: faker.internet.email(),
          username: "FakeUser2",
          profileImageUrl:
            "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
          firstName: "FakerFirst2",
          lastName: "FakerFirst3",
          phoneNumber: 16052285635,
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
