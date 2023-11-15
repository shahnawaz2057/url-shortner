const { Task } = require('../models');
const { Op } = require("sequelize");
const NotFoundError = require('../errors/notFoundError');
const BadRequest = require('../errors/badRequestError');

const createTask = async ( req, res, next) => {
  const { title, reason, chgNumber, timezone, startDate, endDate, startTime, endTime } = req.body;

  try {
    const where = {
      startDate: { [Op.lte]: endDate },
      endDate: { [Op.gte]: startDate},
      startTime: { [Op.eq]: startTime},
      endTime: { [Op.eq]: endTime}
    }
    const existingTask = await Task.findOne({ where });
    if(existingTask) {
      return res.status(400).json({message: "maintenance task already exist for this period"});
    }
    const task = await Task.create({title, reason, chgNumber, timezone, startDate, endDate, startTime, endTime});
    return res.status(201).json({message: 'task created successfully', task});
  } catch (error) {
    next(error);
  }
}

const checkMaintenanceStatus = async (req, res, next) => {
  const { startDate, endDate, startTime} = req.body;
  try {
    const where = {
      startDate: { [Op.lte]: endDate },
      endDate: { [Op.gte]: startDate},
      startTime: { [Op.lte]: startTime},
      endTime: { [Op.gte]: startTime}
    };
    const task = await Task.findOne({ where });
    if(task){
      return res.status(503).json({message: "Under Maintainance", task});
    }else{
      return res.status(200).json({message: "ok"});
    }
   
  } catch (error) {
    next(error);
  }
}

const fetchTasks = async (req, res) => {
  const tasks = await Task.findAll();
  res.status(200).json({tasks})
}

const updateTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOne({ where : {id: parseInt(id)}});
  if(!task) {
    throw new NotFoundError('No schedule task found');
  }

  const { title, reason, chgNumber, timezone, startDate, endDate, startTime, endTime } = req.body;

  if((task.title != title || task.reason != reason || task.chgNumber != chgNumber) && 
      task.startDate == startDate && task.endDate == endDate){
    const updatedTask = await task.update({ title, reason, chgNumber, timezone, startDate, endDate, startTime, endTime });
    return res.status(200).json({task: updatedTask})
  }

  const where = {
    startDate: { [Op.lte]: endDate },
    endDate: { [Op.gte]: startDate},
    // startTime: { [Op.eq]: startTime},
    // endTime: { [Op.eq]: endTime},
    // id: parseInt(id)
  }
  
  const existingTask = await Task.findOne({ where });
  if(existingTask) {
    console.log('existingTask', existingTask.toJSON());
    throw new BadRequest('maintenance task already exist for this period');
  }

  const updatedTask = await task.update({ title, reason, chgNumber, timezone, startDate, endDate, startTime, endTime })

  return res.status(200).json({task: updatedTask})

}

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({ where: { id: parseInt(id)}});
  if(!task) {
    throw new NotFoundError('No schedule task found');
  }

  await task.destroy();
  return res.status(200).json({message:"task deleted successfully"});
}

module.exports = { fetchTasks, createTask, updateTask, deleteTask, checkMaintenanceStatus};
