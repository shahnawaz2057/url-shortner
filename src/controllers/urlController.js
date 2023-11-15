const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

const { Urls } = require("../models");
const BadRequest = require("../errors/badRequestError");
const NotFoundError = require("../errors/notFoundError");

const createShortUrl = async (req, res, next) => {
  try {
    const { originalUrl, shortUrl, userId } = req.body;
    let url = await Urls.findOne({ where: { shortUrl } });
    if (url) {
      throw new BadRequest("short url with the same name already exist!");
    }
    const createdUrl = await Urls.create({
      originalUrl,
      shortUrl,
      userId,
    });

    res.status(StatusCodes.CREATED).json({
      message: "shorten url created successfully!",
      data: createdUrl,
    });
  } catch (err) {
    next(err);
  }
};

const searchUrls = async (req, res, next) => {
  try {
    const { page, perPage, searchUrl } = req.query;
    const currentPage = page ? parseInt(page) : 1;
    const currentLimit = perPage ? parseInt(perPage) : 10;
    const offset = (currentPage - 1) * currentLimit;
    const { userId } = req.body;

    let where;
    if(searchUrl && searchUrl != ""){
     where = {
        [Op.or]: [
          {
            originalUrl: {
              [Op.iLike]: `%${searchUrl}%`,
            },
          },
          {
            shortUrl: {
              [Op.iLike]: `%${searchUrl}%`,
            },
          },
        ],
      };
    }
    if(userId && userId != "") {
      where = {...where, userId}
    }
    if(where === undefined) {
      throw new BadRequest('bad request');
    }
    const { count, rows } = await Urls.findAndCountAll({
      where,
      // include: "creator",
      limit: currentLimit,
      offset: offset,
    });

    res.status(StatusCodes.OK).json({
      data: rows,
      totalCount: count,
      totalPages: Math.ceil(count / currentLimit),
      currentPage: currentPage,
    });
  } catch (err) {
    next(err);
  }
};

const modifyShortUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { shortUrl, userId } = req.body;
    const url = await Urls.findOne({
      where: { id: parseInt(id), userId },
    });
    if (!url) {
      throw new NotFoundError("no urls found!");
    }

    let existedUrl = await Urls.findOne({ where: { shortUrl } });
    if (existedUrl) {
      throw new BadRequest("short url with the same name already exist!");
    } else {
      if (shortUrl) {
        url.shortUrl = shortUrl;
      }

      await url.save();

      res.status(StatusCodes.OK).json({
        message: "shorten url updated successfully!",
        data: url,
      });
    }
  } catch (err) {
    next(err);
  }
};

const deleteShortUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = await Urls.findOne({
      where: { id: parseInt(id) },
    });
    if (!url) {
      throw new NotFoundError("no url found!");
    } else {
      url.isDeleted = true;
      url.deletedAt = new Date();
      await url.save();
      res
        .status(StatusCodes.OK)
        .json({ message: "shorten url deleted successfully" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createShortUrl,
  modifyShortUrl,
  deleteShortUrl,
  searchUrls
};
