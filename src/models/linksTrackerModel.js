"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LinksTracker extends Model {
    static associate() {
      // define association here
    }
  }
  LinksTracker.init(
    {
      urlId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "LinksTracker",
      tableName: "linksTracker",
      createdAt: "visitedAt",
      updatedAt: false,
    }
  );
  return LinksTracker;
};
