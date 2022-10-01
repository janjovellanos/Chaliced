"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        username: "Demo-lition",
        firstName: 'Demo',
        lastName: 'Listen',
        email: "demo@user.io",
        hashedPassword: bcrypt.hashSync("password"),
        address: '123 Demo Lane',
        profileImage: 'https://chaliced-images.s3.us-west-1.amazonaws.com/profile-demo.jpeg'
      },
      {
        username: "Jan",
        firstName: 'Jan',
        lastName: 'Jovellanos',
        email: "jan@user.io",
        hashedPassword: bcrypt.hashSync("password2"),
        address: '123 Jan Street',
        profileImage: 'https://chaliced-images.s3.us-west-1.amazonaws.com/profile-jan.jpg'
      },
      {
        username: "TonyHawk",
        firstName: 'Tony',
        lastName: 'Hawk',
        email: "tonyhawk@user.io",
        hashedPassword: bcrypt.hashSync("password3"),
        address: '123 Hawk Peak',
        profileImage: 'https://chaliced-images.s3.us-west-1.amazonaws.com/profile-tony.jpeg'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(
      "Users",
      {
        username: {
          [Op.in]: ["Demo-lition", "Jan", "TonyHawk"]
        }
      },
      {}
    );
  }
};
