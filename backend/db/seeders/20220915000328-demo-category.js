'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Categories';     // define table name in options object
    await queryInterface.bulkInsert(options, [
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
    options.tableName = 'Categories';     // define table name in options object
    await queryInterface.bulkDelete(options, {
      name: ['Tops', 'Bottoms', 'Shoes', 'Accessories']
    });
  }
};
