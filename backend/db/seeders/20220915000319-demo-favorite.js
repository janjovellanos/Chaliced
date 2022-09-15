'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Favorites", [
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
    await queryInterface.bulkDelete('Favorites', {
      productId: [2, 3, 1]
    });
  }
};
