const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

const { User, Task, Urls, Tags } = require("../models");

const login = async (req, res, next) => {
  try {
    const { employeeId, name, designation } = req.body;
    let user;
    user = await User.findOne({ where: { employeeId } });
    if (!user) {
      user = await User.create({ employeeId, name, designation });
    }

    if(!user.isActive){
      return res.status(StatusCodes.FORBIDDEN).json({message: "You are not authorised"});
    }

    const task =  await checkMaintenanceStatus();
    if(task){
      return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({message: "Under Maintainance", task});
    }else{
      // It should not include urls whose deletion day is more than 30 days
      // const { count, rows } = await Urls.findAndCountAll({
      const urls = await Urls.findAll({  
        // attributes: ['id', 'originalUrl', 'shortUrl', 'isDeleted', 'userId', 'createdAt'],
        attributes: {exclude: ['linksVisited', 'updatedAt']},
        include: {
          model: Tags,
          as: 'tags',
          attributes: ['id', 'name'],
          through: {
            attributes: []
          },
        }
      });
      const tags = await Tags.findAll({
        attributes: ['id', 'name']
      });

      return res.status(StatusCodes.OK).json({
        message: "success!",
        // totalCount: count, 
        user,
        urls,
        tags,
      });
    }
    
  } catch (error) {
    next(error);
  }
}

const checkMaintenanceStatus = async () => {
  try {

    const startDate = new Date();
    const endDate = startDate;

    const where = {
      startDate: { [Op.lte]: endDate },
      endDate: { [Op.gte]: startDate},
    };
    const task = await Task.findOne({ where });
    return task;
   
  } catch (error) {
   
  }
}


module.exports = {
  login,
};