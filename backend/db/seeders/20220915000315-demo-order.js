'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Orders", [
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
    await queryInterface.bulkDelete('Orders', {
      productId: [5, 6, 4]
    });
  }
};
