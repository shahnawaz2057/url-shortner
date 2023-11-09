const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

const { Url, User } = require("../models");
const BadRequest = require("../errors/badRequestError");
const NotFoundError = require("../errors/notFoundError");
const ValidationError = require("../errors/validationError");

const createShortUrl = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError("Validation failed!");
    }

    const { originalUrl, shortUrl, userId } = req.body;
    let url = await Url.findOne({ where: { shortUrl, userId } });
    if (url) {
      throw new BadRequest("Short url with the same name already exist!");
    }
    const createdUrl = await Url.create({
      originalUrl,
      shortUrl,
      userId,
    });

    res.status(StatusCodes.CREATED).json({
      message: "Shorten url created successfully!",
      data: createdUrl,
    });
  } catch (err) {
    next(err);
  }
};

const fetchUrls = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError("Validation failed!");
    }

    const { page, perPage, searchUrl = "" } = req.query;
    const currentPage = page ? parseInt(page) : 1;
    const currentLimit = perPage ? parseInt(perPage) : 10;
    const offset = (currentPage - 1) * currentLimit;

    const where = {
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
    const { count, rows } = await Url.findAndCountAll({
      where,
      include: [{ model: User, required: true }],
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError("Validation failed!");
    }

    const { id } = req.params;
    const { shortUrl, userId } = req.body;
    const url = await Url.findOne({
      where: { id: parseInt(id), userId },
    });
    if (!url) {
      throw new NotFoundError("No urls found!");
    }

    let existedUrl = await Url.findOne({ where: { shortUrl, userId } });
    if (existedUrl) {
      throw new BadRequest("Short url with the same name already exist!");
    } else {
      if (shortUrl) {
        url.shortUrl = shortUrl;
      }

      await url.save();

      res.status(StatusCodes.OK).json({
        message: "Shorten url updated successfully!",
        data: url,
      });
    }
  } catch (err) {
    next(err);
  }
};

const deleteShortUrl = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError("Validation failed!");
    }

    const { id } = req.params;
    const { userId } = req.body;
    const url = await Url.findOne({
      where: { id: parseInt(id), userId },
    });
    if (!url) {
      throw new NotFoundError("No url found!");
    } else {
      url.isDeleted = true;
      await url.save();
      res
        .status(StatusCodes.OK)
        .json({ message: "Shorten url deleted successfully" });
    }
  } catch (err) {
    next(err);
  }
};

const reDirectTooriginalUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = await Url.findOne({
      where: { id: parseInt(id) },
    });
    if (!url) {
      throw new NotFoundError("No url found!");
    }

    await Url.increment("linksVisited", {
      by: 1,
      where: {
        id: parseInt(id),
      },
    });

    return res.redirect(url.originalUrl);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createShortUrl,
  fetchUrls,
  reDirectTooriginalUrl,
  modifyShortUrl,
  deleteShortUrl,
};
