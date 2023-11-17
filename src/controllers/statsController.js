const _ = require("lodash");
const {
  AuditsModel,
  LinksTrackerModel,
  sequelize,
  Sequelize,
} = require("../models");

const getVistedLinkStats = async (req, res, next) => {
  try {
    const result = await sequelize.query(
      // `SELECT "url"."id", "url"."originalUrl", "url"."shortUrl", COUNT("link"."id"), array_agg("link"."createdAt") as "historicalTimestamps" FROM "urls" as "url" LEFT JOIN "linksTracker" as "link" ON "url"."id" = "link"."urlId" GROUP BY "url"."id"`,
      `SELECT COUNT("id"), array_agg("createdAt") as "timestamps" FROM "linksTracker" GROUP BY DATE("createdAt")`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // const result = await LinksTrackerModel.findAndCountAll({
    //   distinct: true,
    //   attributes: [
    //     [Sequelize.fn("array_agg", Sequelize.col("createdAt")), "timestamps"],
    //   ],
    //   group: [sequelize.fn("DATE", sequelize.col("createdAt"))],
    // });

    // res.status(200).json({
    //   count: result.count,
    //   data: result?.rows[0],
    // });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getCreateLinkStats = async (req, res, next) => {
  try {
    const { userId } = req.query;
    // let query = `SELECT COUNT("id"), array_agg("createdAt") as "historicalTimestamps" FROM "audits" WHERE "action" = 'CREATE' AND "tableName" = 'urls'`;
    // if (userId) {
    //   query = query + `AND "userId" = ${userId}`;
    // }
    // console.log(query);
    // const result = await sequelize.query(query, {
    //   type: sequelize.QueryTypes.SELECT,
    // });
    let where = { action: "CREATE", tableName: "urls" };
    if (userId) {
      where = {
        ...where,
        userId: userId,
      };
    }
    const result = await AuditsModel.findAndCountAll({
      distinct: true,
      attributes: [
        [Sequelize.fn("array_agg", Sequelize.col("createdAt")), "timestamps"],
      ],
      where,
    });

    res.status(200).json({
      count: result.count,
      data: result?.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

const getDeleteLinkStats = async (req, res, next) => {
  try {
    const { userId } = req.query;
    // let query = `SELECT COUNT("id"), array_agg("createdAt") as "historicalTimestamps" FROM "audits" WHERE "action" = 'DELETE' AND "tableName" = 'urls'`;
    // if (userId) {
    //   query = query + `AND "userId" = ${userId}`;
    // }
    // const result = await sequelize.query(query, {
    //   type: sequelize.QueryTypes.SELECT,
    // });

    let where = { action: "DELETE", tableName: "urls" };
    if (userId) {
      where = {
        ...where,
        userId: userId,
      };
    }
    const result = await AuditsModel.findAndCountAll({
      distinct: true,
      attributes: [
        [Sequelize.fn("array_agg", Sequelize.col("createdAt")), "timestamps"],
      ],
      where,
    });

    res.status(200).json({
      count: result.count,
      data: result?.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getVistedLinkStats,
  getCreateLinkStats,
  getDeleteLinkStats,
};
