const { Urls, Audit } = require("../models");
const NotFoundError = require("../errors/notFoundError");

const redirectToOriginalUrl = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;
    const url = await Urls.findOne({
      where: { shortUrl, isDeleted: false },
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

    await Audit.create({
      urlId: url.id,
      userId: url.userId,
      visitedAt: new Date()
    });

    return res.redirect(url.originalUrl);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  redirectToOriginalUrl,
};
