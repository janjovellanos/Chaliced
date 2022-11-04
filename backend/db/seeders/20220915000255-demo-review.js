'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';     // define table name in options object

    await queryInterface.bulkInsert(options, [
      {
        buyerId: 1,
        sellerId: 2,
        productId: 5,
        body: 'Great service',
        stars: 5,
      },
      {
        buyerId: 2,
        sellerId: 3,
        productId: 6,
        body: 'Good service',
        stars: 4,
      },
      {
        buyerId: 3,
        sellerId: 1,
        productId: 4,
        body: 'Okay service',
        stars: 3,
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';     // define table name in options object
    await queryInterface.bulkDelete(options, {
      productId: [5, 6, 4]
    });
  }
};
