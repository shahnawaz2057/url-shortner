"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UrlsModel, AuditsModel }) {
      // define association here
      this.hasMany(UrlsModel, {
        foreignKey: { name: "userId", allowNull: false },
        as: "urls",
      });
      this.hasMany(AuditsModel, {
        foreignKey: { name: "recordId", allowNull: false },
        constraints: false,
      });
    }
  }
  User.init(
    {
      employeeId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a employeeId" },
          notEmpty: { msg: "EmployeeId must not be empty" },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a name" },
          notEmpty: { msg: "Name must not be empty" },
        },
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a designation" },
          notEmpty: { msg: "Designation must not be empty" },
        },
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "UsersModel",
      tableName: "users",
    }
  );
  return User;
};
