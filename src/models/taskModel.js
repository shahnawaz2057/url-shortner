'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate() {
      // define association here
    }

  }
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'must have a title' },
        notEmpty: { msg: 'title must not be empty' },
      },
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'must specify reason' },
        notEmpty: { msg: 'reason must not be empty' },
      },
    },
    chgNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'must have a change number' },
        notEmpty: { msg: 'change number must not be empty' },
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, 
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks'
  });
  return Task;
}
