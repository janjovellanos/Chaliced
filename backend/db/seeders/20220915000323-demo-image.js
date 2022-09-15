'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Images", [
      {
        url: 'pic of shoes',
        productId: 1
      },
      {
        url: 'pic of shirt',
        productId: 2
      },
      {
        url: 'pic of pants',
        productId: 3
      },
      {
        url: 'pic of item',
        productId: 4
      },
      {
        url: 'pic of item',
        productId: 5
      },
      {
        url: 'pic of item',
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
