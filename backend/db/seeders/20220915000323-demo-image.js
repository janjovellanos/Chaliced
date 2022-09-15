'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Images", [
      {
        url: 'pic of shoes',
        userId: 1,
        productId: 1
      },
      {
        url: 'pic of shirt',
        userId: 2,
        productId: 2
      },
      {
        url: 'pic of pants',
        userId: 3,
        productId: 3
      },
      {
        url: 'pic of item',
        userId: 1,
        productId: 4
      },
      {
        url: 'pic of item',
        userId: 2,
        productId: 5
      },
      {
        url: 'pic of item',
        userId: 3,
        productId: 6
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Favorites', {
      productId: [1, 2, 3, 4, 5, 6]
    });
  }
};
