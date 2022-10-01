'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        name: 'Salomon XT-4',
        description: 'Great hiking shoe, but also versatile. Very nice silhouette and colorway',
        size: 'US10',
        price: 140,
        userId: 1,
        categoryId: 3,
        sold: false,
      },
      {
        name: 'Y2K Umbro Shirt',
        description: 'Can take better pics upon request. Good condition',
        size: 'M',
        price: 25,
        userId: 2,
        categoryId: 1,
        sold: false,
      },
      {
        name: 'John Bull Pant',
        description: 'Very stylish JP Cool black pants',
        size: '31W',
        price: 70,
        userId: 3,
        categoryId: 2,
        sold: false,
      },
      {
        name: 'Doc Marten Loafers',
        description: 'Comfy formal or casual shoes',
        size: 'US9',
        price: 10,
        userId: 1,
        categoryId: 3,
        sold: true,
      },
      {
        name: 'Lululemon Sweatpant',
        description: 'Found this in the bins at my local goodwill. Now I resell online for 8x as much ahahahaha',
        size: 'M',
        price: 80,
        userId: 2,
        categoryId: 2,
        sold: true,
      },
      {
        name: 'CPFM Tee',
        description: 'Cactus plant smiley all-over print tee. Very rare, letting go for fair price! No lowballs!!!',
        size: 'L',
        price: 120,
        userId: 3,
        categoryId: 1,
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
