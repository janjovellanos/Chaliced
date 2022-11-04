'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Orders';     // define table name in options object
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        productId: 5
      },
      {
        userId: 2,
        productId: 6
      },
      {
        userId: 3,
        productId: 4
      },
    ]);

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Orders';     // define table name in options object
    await queryInterface.bulkDelete(options, {
      productId: [5, 6, 4]
    });
  }
};
