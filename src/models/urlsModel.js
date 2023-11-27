"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Urls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Tags }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: { name: "userId", allowNull: false },
        as: "user",
      });

      this.belongsToMany(Tags, { 
        through: 'urls_tags', 
        as: 'tags',
        foreignKey: {name: 'urlId', allowNull: false}, 
      });
    }
  }
  Urls.init(
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
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: "Urls",
      tableName: "urls",
    }
  );
  return Urls;
};
