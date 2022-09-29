'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Images", [
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/salomon1.jpeg',
        userId: 1,
        productId: 1
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/salomon2.jpeg',
        userId: 1,
        productId: 1
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/umbro1.jpeg',
        userId: 2,
        productId: 2
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/umbro2.jpeg',
        userId: 2,
        productId: 2
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/johnbull1.jpeg',
        userId: 3,
        productId: 3
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/docmartens1.jpeg',
        userId: 1,
        productId: 4
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/docmartens2.jpeg',
        userId: 1,
        productId: 4
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/lulu1.jpeg',
        userId: 2,
        productId: 5
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/lulu2.jpeg',
        userId: 2,
        productId: 5
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/cpfm1.jpeg',
        userId: 3,
        productId: 6
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/cpfm2.jpeg',
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
