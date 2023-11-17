const { Op } = require("sequelize");
const { Urls, User, LinksTracker, Sequelize, sequelize } = require("../models");
const NotFoundError = require("../errors/notFoundError");

const getStats = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const visitedStats = await getVisitedStats(userId);

    const createdStats = await getCreatedStats(userId);

    const deletedStats = await getDeletedStats(userId);

    res.status(200).json({
      visited: visitedStats,
      created: createdStats,
      deleted: deletedStats,
    });
  } catch (err) {
    next(err);
  }
};

const getVisitedStats = async (userId) => {
  let userUrlIds = [];
  let where = {};
  if (userId) {
    const user = await User.findOne({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      throw new NotFoundError("no user found!");
    }

    const urlIds = await Urls.findAll({
      attributes: ["id"],
      where: {
        userId: user.id,
      },
    });

    if (urlIds) {
      urlIds.map((urlId) => {
        userUrlIds.push(urlId.id);
      });
    }

    where = {
      urlId: {
        [Op.in]: userUrlIds,
      },
    };
  }
  const stats = await LinksTracker.findAndCountAll({
    distinct: true,
    where,
    attributes: [
      [Sequelize.fn("array_agg", Sequelize.col("visitedAt")), "timestamps"],
    ],
    group: [sequelize.fn("DATE", sequelize.col("visitedAt"))],
  });
  const totalCount = await LinksTracker.count({
    where,
  });

  return {
    stats: stats.count,
    totalCount,
  };
};

const getCreatedStats = async (userId) => {
  let where = {
    createdAt: {
      [Op.not]: null,
    },
  };
  if (userId) {
    where = {
      ...where,
      userId,
    };
  }
  const stats = await Urls.findAndCountAll({
    distinct: true,
    where,
    attributes: [
      [Sequelize.fn("array_agg", Sequelize.col("createdAt")), "timestamps"],
    ],
    group: [sequelize.fn("DATE", sequelize.col("createdAt"))],
  });
  const totalCount = await Urls.count({
    where,
  });

  return {
    stats: stats.count,
    totalCount,
  };
};

const getDeletedStats = async (userId) => {
  let where = {
    deletedAt: {
      [Op.not]: null,
    },
  };
  if (userId) {
    where = {
      ...where,
      userId,
    };
  }
  const stats = await Urls.findAndCountAll({
    distinct: true,
    where,
    attributes: [
      [Sequelize.fn("array_agg", Sequelize.col("deletedAt")), "timestamps"],
    ],
    group: [sequelize.fn("DATE", sequelize.col("deletedAt"))],
  });
  const totalCount = await Urls.count({
    where,
  });
  return {
    stats: stats.count,
    totalCount,
  };
};

module.exports = {
  getStats,
};
