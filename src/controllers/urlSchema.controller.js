const { UrlSchema } = require('../../models');
const NotFoundError = require('../errors/not-found-error')


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

const modifyShortUrl = async (req, res) => {
  const { shortUrlName } = req.params;
  const { newName, userId } = req.body;
  const url = await UrlSchema.findOne({ where: { shortUrlName, userId }});
  if(url) {
    url.shortUrlName = newName;
    await url.save();

    return res.status(200).send({url})
  }else {
    res.status(404).json('Not found');
  }
}

const deleteShortUrl = async (req, res) => {
  const { shortUrlName } = req.params;
  const { userId } = req.body;
  const url = await UrlSchema.findOne({ where: { shortUrlName, userId }});
  if (!url) {
		throw new NotFoundError('url not found');
	}

  url.isDeleted = true;
	await url.save(); 
	res.status(200).json({message: 'url deleted'});
}

const reDirectToOrignalUrl = async (req, res) => {
  try {
    const { shortUrlName } = req.params;
    console.log('shorturl name', shortUrlName);
    const url = await UrlSchema.findOne({ where: { shortUrlName }});
    // console.log('orignal url', url);
    if (url) {
      await UrlSchema.increment('linksVisited', {
        by: 1,
        where: {
          shortUrlName
        }
      });
      return res.redirect(url.orignalUrl);
    } else res.status(404).json('Not found');
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
}

module.exports = { createShortUrl, fetchUrls, reDirectToOrignalUrl, modifyShortUrl, deleteShortUrl }