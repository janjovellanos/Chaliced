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
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/nikemmw1.webp',
        userId: 1,
        productId: 7
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/nikemmw2.jpeg',
        userId: 1,
        productId: 7
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/plant1.jpeg',
        userId: 2,
        productId: 8
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/plant2.jpeg',
        userId: 2,
        productId: 8
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/stussy1.webp',
        userId: 3,
        productId: 9
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/stussy2.webp',
        userId: 3,
        productId: 9
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/stussy3.webp',
        userId: 3,
        productId: 9
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/kapital1.jpeg',
        userId: 1,
        productId: 10
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/kapital2.jpeg',
        userId: 1,
        productId: 10
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/russell1.jpeg',
        userId: 2,
        productId: 11
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/russell2.jpeg',
        userId: 2,
        productId: 11
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/eric1.webp',
        userId: 3,
        productId: 12
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/jound1.jpeg',
        userId: 1,
        productId: 13
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/jound2.webp',
        userId: 1,
        productId: 13
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/futura1.jpeg',
        userId: 2,
        productId: 14
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/cdg1.webp',
        userId: 3,
        productId: 15
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/cdg2.webp',
        userId: 3,
        productId: 15
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/dream1.webp',
        userId: 1,
        productId: 16
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/dream2.webp',
        userId: 1,
        productId: 16
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/birk1.jpeg',
        userId: 2,
        productId: 17
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/birk2.jpeg',
        userId: 2,
        productId: 17
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/birk3.jpeg',
        userId: 2,
        productId: 17
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/lulushort1.jpeg',
        userId: 3,
        productId: 18
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/lulushort2.jpeg',
        userId: 3,
        productId: 18
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/cpfmchain.webp',
        userId: 1,
        productId: 19
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/cpfmchain2.webp',
        userId: 1,
        productId: 19
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/yama1.webp',
        userId: 2,
        productId: 20
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/yama2.webp',
        userId: 2,
        productId: 20
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/yama3.webp',
        userId: 2,
        productId: 20
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/center1.jpeg',
        userId: 3,
        productId: 21
      },
      {
        url: 'https://chaliced-images.s3.us-west-1.amazonaws.com/center2.jpeg',
        userId: 3,
        productId: 21
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', {
      productId: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    });
  }
};
