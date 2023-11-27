const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

const { Urls, Tags } = require("../models");
const BadRequest = require("../errors/badRequestError");
const NotFoundError = require("../errors/notFoundError");

const createShortUrl = async (req, res, next) => {
  try {
    const { originalUrl, shortUrl, tags } = req.body;
    const { userId } = req.user;
    let url = await Urls.findOne({ where: { shortUrl } });
    if (url) {
      throw new BadRequest("short url with the same name already exist!");
    }

    const createdUrl = await Urls.create({
      originalUrl,
      shortUrl,
      userId,
      createdAt: new Date()
    });

    if(tags) {
      const existingTags = await Tags.findAll({ where: { name: tags}});
      // existingTags.map(tag => {
      //   console.log(tag.toJSON());
      // })
      const newTags = tags.filter((tag) => !existingTags.some((t) => t.name === tag));
      const createdTags = await Tags.bulkCreate(newTags.map((tag) => ({ name: tag })));

      const tagList = [...existingTags, ...createdTags];
      await createdUrl.addTags(tagList);
    }
    

    // fetch created url with tags
    const urlWithTags = await Urls.findOne({ where : {id: createdUrl.id} , 
      include: {
        model: Tags,
        as: 'tags',
        attributes: ['name'],
        through: {
          attributes: []
        },
      } 
  })

    res.status(StatusCodes.CREATED).json({
      message: "shorten url created successfully!",
      data: urlWithTags,
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
    const { userId } = req.user;

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
      urls: rows,
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
    const { shortUrl, tags } = req.body;
    const { userId } = req.user;
    const url = await Urls.findOne({
      where: { id: parseInt(id), userId },
    });
    if (!url) {
      throw new NotFoundError("no urls found!");
    }

    let existedUrl = await Urls.findOne({ where: { shortUrl } });
    if (existedUrl) {
      throw new BadRequest("short url with the same name already exist!");
    } 
    await url.update({shortUrl});

    if(tags){
      const existingTags = await Tags.findAll({ where: { name: tags}});
      const newTags = tags.filter((tag) => !existingTags.some((t) => t.name === tag));
      const createdTags = await Tags.bulkCreate(newTags.map((tag) => ({ name: tag })));

      const tagList = [...existingTags, ...createdTags];
      await url.setTags(tagList)
    }

    res.status(StatusCodes.OK).json({
      message: "shorten url updated successfully!",
      data: url,
    });
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
