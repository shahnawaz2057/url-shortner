"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Audits extends Model {}
  Audits.init(
    {
      action: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["CREATE", "UPDATE", "DELETE", "LOGIN"]],
        },
      },
      tableName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["urls", "users"]],
        },
      },
      recordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "AuditsModel",
      tableName: "audits",
    }
  );
  return Audits;
};
