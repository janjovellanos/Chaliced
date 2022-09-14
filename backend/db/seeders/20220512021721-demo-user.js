"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        email: "demo@user.io",
        username: "Demo-lition",
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        email: "felipe@user.io",
        username: "Felipe",
        hashedPassword: bcrypt.hashSync("password2")
      },
      {
        email: "busterPosey@user.io",
        username: "Buster",
        hashedPassword: bcrypt.hashSync("password3")
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(
      "Users",
      {
        username: {
          [Op.in]: ["Demo-lition", "Felipe", "Buster"]
        }
      },
      {}
    );
  }
};
