'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Audit extends Model {
    static associate() {
      // define association here
    }

  }
  Audit.init({
    urlId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    //usedId of the user who create the url
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    visitedAt:{
      type: DataTypes.DATE,
      allowNull: false
    }
  }, 
  {
    sequelize,
    modelName: 'Audit',
    tableName: 'audits',
    timestamps: false
  });
  return Audit;
}
