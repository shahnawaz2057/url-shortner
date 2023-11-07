const express = require('express');
const { createShortUrl, fetchUrls, modifyShortUrl, reDirectToOrignalUrl, deleteShortUrl } = require('../controllers/urlSchema.controller')

const router = express.Router();

/**
 * A UrlSchema type
 * @typedef {object} UrlSchema
 * @property {string} orignalUrl.required - The long url
 * @property {string} shortUrlName.required - The short url name
 */

/**
 * A CreateUrlSchema type
 * @typedef {object} CreateUrlSchema
 * @property {string} orignalUrl.required - The long url
 * @property {string} shortUrlName.required - The short url name
 * @property {number} userId.required - The user Id
 */

/**
 * A UpdateUrlSchema type
 * @typedef {object} UpdateUrlSchema
 * @property {string} newName.required - The short url name
 * @property {number} userId.required - The user Id
 */

/**
 * A DeleteUrlSchema type
 * @typedef {object} DeleteUrlSchema
 * @property {number} userId.required - The user Id
 */

/**
 * GET /api/urls
 * @summary List of urls
 * @tags urls - Manage urls
 * @return {array<UrlSchema>} 200 - success response - application/json
 */

/**
 * GET /api/urls/{shortName}
 * @summary Get url by shortName
 * @tags urls
 * @param {string} shortName.path.required
 * @return {UrlSchema} 200 - success response - application/json
 */

/**
 * PUT /api/urls/{shortUrlName}
 * @summary Update url
 * @tags urls
 * @param {string} shortUrlName.path.required
 * @param {UpdateUrlSchema} request.body.required - User info
 * @return {UrlSchema} 200 - success response - application/json
 */

/**
   * POST /api/urls
   * @summary Create urls
   * @tags urls
   * @param {CreateUrlSchema} request.body.required - User info
   * @return {UrlSchema} 200 - User response
   */

/**
   * DELETE /api/urls/{shortUrlName}
   * @summary Delete url
   * @tags urls
   * @param {string} shortUrlName.path.required
   * @param {DeleteUrlSchema} request.body.required - User info
   * @return {string} 200 - user deleted
   */

router.route('/')
.get(fetchUrls)
.post(createShortUrl)

router.route('/:shortUrlName')
.get(reDirectToOrignalUrl)
.put(modifyShortUrl)
.delete(deleteShortUrl);

module.exports = router;