"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Url extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UsersModel, AuditsModel, linksModel }) {
      // define association here
      this.belongsTo(UsersModel, {
        foreignKey: { name: "userId", allowNull: false },
        as: "creator",
      });
      this.hasMany(AuditsModel, {
        foreignKey: { name: "recordId", allowNull: false },
        constraints: false,
      });
    }
  }
  Url.init(
    {
      originalUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "long Url must not be null" },
          notEmpty: { msg: "long Url must not be empty" },
        },
      },
      shortUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "shortUrl must not be null" },
          notEmpty: { msg: "shortUrl must not be empty" },
        },
      },
      linksVisited: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "UrlsModel",
      tableName: "urls",
    }
  );
  return Url;
};
