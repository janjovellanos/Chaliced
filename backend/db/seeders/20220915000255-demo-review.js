'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Reviews", [
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
    await queryInterface.bulkDelete('Reviews', {
      productId: [5, 6, 4]
    });
  }
};
