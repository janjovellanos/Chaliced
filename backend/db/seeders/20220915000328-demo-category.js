'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", [
      {
        name: 'Tops'
      },
      {
        name: 'Bottoms'
      },
      {
        name: 'Shoes'
      },
      {
        name: 'Accessories'
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', {
      name: ['Tops', 'Bottoms', 'Shoes', 'Accessories']
    });
  }
};
