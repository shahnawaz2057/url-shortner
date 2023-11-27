const { Urls, Audit, sequelize, Sequelize } = require("../models");

const statistics = async (req, res, next) => {
  try {
    const { userId, isAdmin } = req.user;

    const createdStats = await getStatistics(userId, isAdmin, Urls, 'createdAt');
    const deletedStats = await getStatistics(userId, isAdmin, Urls, 'deletedAt');
    const visitedStats = await getStatistics(userId, isAdmin, Audit, 'visitedAt');

    return res.status(200).json({
      createdStats: createdStats?.stats,
      deletedStats: deletedStats?.stats,
      visitedStats: visitedStats?.stats,
      createdCount: createdStats?.totalCount,
      deletedCount: deletedStats?.totalCount,
      visitedCount: visitedStats?.totalCount,
    });
    
  } catch (error) {
    next(error);
  }
}

const getStatistics = async (userId, isAdmin, Model, columnName) => {
  let where = {userId};

  if(isAdmin){
    where = {}
  }
  if(columnName === 'deletedAt'){
    where = {
      ...where, isDeleted: true
    }
  }
  const stats = await Model.findAndCountAll({
    distinct: true,
    where,
    attributes: [
      [Sequelize.fn("array_agg", Sequelize.col(columnName)), "timestamps"],
    ],
    group: [sequelize.fn("DATE", sequelize.col(columnName))],
  });

  const totalCount = await Model.count({
    where,
  });

  return {
    stats: stats.count,
    totalCount,
  };
};

module.exports = {
  statistics,
}