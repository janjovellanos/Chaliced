"use strict";
const { Model, Validator } = require("sequelize");
const bcrypt = require("bcryptjs");
//

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email } = this; // context will be the User instance
      return { id, username, email };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static associate(models) {
      User.hasMany(models.Product, {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true})
      User.hasMany(models.Favorite, {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true})
      User.hasMany(models.Order, {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true})
      User.hasMany(models.Review, {foreignKey: 'buyerId', onDelete: 'CASCADE', hooks: true})
      User.hasMany(models.Review, {foreignKey: 'sellerId', onDelete: 'CASCADE', hooks: true})
    }
    static async login({ credential, password }) {
      const { Op } = require("sequelize");
      const user = await User.scope("loginUser").findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope("currentUser").findByPk(user.id);
      }
    }

    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword
      });
      return await User.scope("currentUser").findByPk(user.id);
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50]
        }
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 50]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
      address: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 100]
        }
      },
      bio: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 300]
        }
      },
      profileImage: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 2000]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email"]
          // "createdAt", "updatedAt"
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};
