const { UrlSchema } = require('../../models');

const createShortUrl = async ( req, res) => {
	const { orignalUrl, shortUrlName, userId } = req.body;

  let url = await UrlSchema.findOne({ where: {orignalUrl} });
  if (url) {
    console.log('found one');
    return res.json({url});
  }
	const urlSchema = await UrlSchema.create({orignalUrl, shortUrlName, userId});
	return res.status(201).send({urlSchema});
}

const fetchUrls = async ( req, res) => {
  let urls = await UrlSchema.findAll({include: 'User'});
	return res.status(202).send({urls});
}

const reDirectToOrignalUrl = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log('shorturl name', id);
    const url = await UrlSchema.findOne({ where: { shortUrlName: id }});
    // console.log('orignal url', url);
    if (url) {
      await UrlSchema.increment('linksVisited', {
        by: 1,
        where: {
          shortUrlName: id
        }
      });
      return res.redirect(url.orignalUrl);
    } else res.status(404).json('Not found');
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
}

module.exports = { createShortUrl, fetchUrls, reDirectToOrignalUrl }