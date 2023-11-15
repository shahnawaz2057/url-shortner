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
    timezone: {
      type: DataTypes.STRING,
      defaultValue: 'singapore'
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    endTime: {
      type: DataTypes.TIME,
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
