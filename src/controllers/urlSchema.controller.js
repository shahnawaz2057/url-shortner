const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

const { UrlSchema } = require("../../models");
const BadRequest = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found-error");
const ValidationError = require("../errors/validation-error");

const createShortUrl = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError("Validation failed!");
    }

    const { orignalUrl, shortUrlName, userId } = req.body;
    let url = await UrlSchema.findOne({ where: { shortUrlName } });
    if (url) {
      throw new BadRequest("Short url with the same name already exist!");
    }
    const urlSchema = await UrlSchema.create({
      orignalUrl,
      shortUrlName,
      userId,
    });

    res.status(StatusCodes.CREATED).json({
      message: "Shorten url created successfully!",
      data: urlSchema,
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
          orignalUrl: {
            [Op.iLike]: `%${searchUrl}%`,
          },
        },
        {
          shortUrlName: {
            [Op.iLike]: `%${searchUrl}%`,
          },
        },
      ],
    };
    const { count, rows } = await UrlSchema.findAndCountAll({
      where,
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
    const url = await UrlSchema.findOne({
      where: { id: parseInt(id), userId },
    });
    if (!url) {
      throw new NotFoundError("No urls found!");
    } else {
      if (shortUrl) {
        url.shortUrlName = shortUrl;
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
    const url = await UrlSchema.findOne({
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

const reDirectToOrignalUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = await UrlSchema.findOne({
      where: { id: parseInt(id) },
    });
    if (!url) {
      throw new NotFoundError("No url found!");
    }

    await UrlSchema.increment("linksVisited", {
      by: 1,
      where: {
        id: parseInt(id),
      },
    });

    return res.redirect(url.orignalUrl);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createShortUrl,
  fetchUrls,
  reDirectToOrignalUrl,
  modifyShortUrl,
  deleteShortUrl,
};
