const { UrlsModel } = require("../models");
const NotFoundError = require("../errors/notFoundError");

const redirectToOriginalUrl = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;
    const url = await UrlsModel.findOne({
      where: { shortUrl },
    });
    if (!url) {
      throw new NotFoundError("no url found!");
    }

    await url.increment("linksVisited", {
      by: 1,
      where: {
        shortUrl,
      },
    });

    return res.redirect(url.originalUrl);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  redirectToOriginalUrl,
};
