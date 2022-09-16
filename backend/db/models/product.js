'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Image, {foreignKey: 'productId', onDelete: 'CASCADE', hooks: true})
      Product.hasMany(models.Favorite, {foreignKey: 'productId', onDelete: 'CASCADE', hooks: true})
      Product.hasOne(models.Order, {foreignKey: 'productId', onDelete: 'CASCADE', hooks: true})
      Product.hasOne(models.Review, {foreignKey: 'productId', onDelete: 'CASCADE', hooks: true})
      Product.belongsTo(models.Category, {foreignKey: 'categoryId'})
      Product.belongsTo(models.User, {foreignKey: 'userId', as: 'Seller'})
    }

  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 256]
      }
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    sold: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
