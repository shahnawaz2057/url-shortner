"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LinksTracker extends Model {}
  LinksTracker.init(
    {
      urlId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "LinksTrackerModel",
      tableName: "linksTracker",
    }
  );
  return LinksTracker;
};
