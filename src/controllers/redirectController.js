const { UrlsModel, LinksTrackerModel, sequelize } = require("../models");
const NotFoundError = require("../errors/notFoundError");

const redirectToOriginalUrl = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { shortUrl } = req.params;
    const url = await UrlsModel.findOne({
      where: { shortUrl },
      transaction: t,
    });
    if (!url) {
      throw new NotFoundError("no url found!");
    }

    // await url.increment("linksVisited", {
    //   by: 1,
    //   where: {
    //     shortUrl,
    //   },
    // });

    await LinksTrackerModel.create(
      {
        urlId: url.id,
      },
      { transaction: t }
    );

    t.commit();
    return res.redirect(url.originalUrl);
  } catch (err) {
    t.rollback();
    next(err);
  }
};

module.exports = {
  redirectToOriginalUrl,
};
