"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Users';     // define table name in options object
    return queryInterface.bulkInsert(options, [
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
    options.tableName = 'Users';     // define table name in options object

    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: ["Demo-lition", "Jan", "TonyHawk"]
        }
      },
      {}
    );
  }
};
