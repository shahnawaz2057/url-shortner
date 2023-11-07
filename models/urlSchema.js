'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UrlSchema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false}})
    }
  }
  UrlSchema.init({
    orignalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'long Url must not be null' },
        notEmpty: { msg: 'long Url must not be empty' },
      },
    },
    shortUrlName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'shortUrl must not be null' },
        notEmpty: { msg: 'shortUrl must not be empty' },
      },
    },
    linksCreated: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    linksVisited: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    linksDeleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, 
  {
    sequelize,
    modelName: 'UrlSchema',
    tableName: 'urlSchemas'
  });
  return UrlSchema;
};