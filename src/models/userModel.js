"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Url }) {
      // define association here
      this.hasMany(Url, {
        foreignKey: { name: "userId", allowNull: false },
      });
    }

    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a name" },
          notEmpty: { msg: "Name must not be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a email" },
          notEmpty: { msg: "email must not be empty" },
          isEmail: { msg: "Must be a valid email address" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a password" },
          notEmpty: { msg: "password must not be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
