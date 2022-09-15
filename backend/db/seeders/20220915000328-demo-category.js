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
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', {
      name: ['Tops', 'Bottoms', 'Shoes']
    });
  }
};
