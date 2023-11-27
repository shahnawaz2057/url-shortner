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
        foreignKey: {name: 'tagId', allowNull: false}, 
       });
    }
  }
  Tags.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg: 'tags name must not be null'}
      }
    },
    // createdAt: {
    //   allowNull: false,
    //   type: DataTypes.DATE
    // },
    // updatedAt: {
    //   allowNull: true,
    //   type: DataTypes.DATE
    // }
  },
  {
    sequelize,
    tableName: 'tags',
    modelName: 'Tags'
  });

  return Tags;
}