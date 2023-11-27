'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    static associate({ Urls }) {
      // define association here
      this.belongsToMany(Urls, { 
        through: 'urls_tags',
        // foreignKey: 'urlId', 
        timestamps: false });
    }
  }
  Tags.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg: 'tags name must not be null'}
      }
    }
  },
  {
    sequelize,
    tableName: 'tags',
    modelName: 'Tags'
  });

  return Tags;
}