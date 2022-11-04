'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Favorites';     // define table name in options object
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        productId: 2
      },
      {
        userId: 2,
        productId: 3
      },
      {
        userId: 3,
        productId: 1
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Favorites';     // define table name in options object
    await queryInterface.bulkDelete(options, {
      productId: [2, 3, 1]
    });
  }
};
