'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        name: 'Salomon XT-4',
        description: 'Great hiking shoe',
        size: 'US10',
        price: 140,
        userId: 1,
        categoryId: 3,
        sold: false,
      },
      {
        name: 'Y2K Umbro Shirt',
        description: 'Good condition',
        size: 'M',
        price: 30,
        userId: 2,
        categoryId: 1,
        sold: false,
      },
      {
        name: 'John Bull Pant',
        description: 'Cool black pants',
        size: '31',
        price: 140,
        userId: 3,
        categoryId: 2,
        sold: false,
      },
      {
        name: 'Sold Item 1',
        description: 'This sold',
        size: 'S',
        price: 10,
        userId: 1,
        categoryId: 3,
        sold: true,
      },
      {
        name: 'Sold Item 2',
        description: 'This Sold',
        size: 'M',
        price: 10,
        userId: 2,
        categoryId: 2,
        sold: true,
      },
      {
        name: 'Sold Item 3',
        description: 'This sold',
        size: 'L',
        price: 10,
        userId: 3,
        categoryId: 3,
        sold: true,
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', {
      name: ['Salomon XT-4', 'Y2K Umbro Shirt', 'John Bull Pant', 'Sold Item 1', 'Sold Item 2', 'Sold Item 3']
    });
  }
};
