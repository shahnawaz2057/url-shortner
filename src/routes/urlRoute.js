const express = require("express");
const { body, query, param } = require("express-validator");

const {
  createShortUrl,
  modifyShortUrl,
  deleteShortUrl,
  searchUrls,
} = require("../controllers/urlController");
const validate = require("../middlewares/validateMiddleware");

const router = express.Router();

/**
 * A UrlSchema type
 * @typedef {object} UrlSchema
 * @property {string} originalUrl.required - The long url
 * @property {string} shortUrl.required - The short url name
 */

/**
 * A CreateUrlSchema type
 * @typedef {object} CreateUrlSchema
 * @property {string} originalUrl.required - The long url
 * @property {string} shortUrl.required - The short url name
 * @property {number} userId.required - The user Id
 */

/**
 * A UpdateUrlSchema type
 * @typedef {object} UpdateUrlSchema
 * @property {string} shortUrl.required - The short url name
 * @property {number} userId.required - The user Id
 */

/**
 * A DeleteUrlSchema type
 * @typedef {object} DeleteUrlSchema
 * @property {number} id.required - The user Id
 */

/**
 * GET /api/urls
 * @summary List of urls
 * @tags urls - Manage urls
 * @return {array<UrlSchema>} 200 - success response - application/json
 */

/**
 * GET /api/urls/{shortUrl}
 * @summary Get url by shortUrl
 * @tags urls
 * @param {string} shortUrl.path.required
 * @return {UrlSchema} 200 - success response - application/json
 */

/**
 * PUT /api/urls/{shortUrl}
 * @summary Update url
 * @tags urls
 * @param {string} id.path.required - id of url to be updated
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
 * DELETE /api/urls/{shortUrl}
 * @summary Delete url
 * @tags urls
 * @param {string} urlId.path.required
 * @return {string} 200 - user deleted
 */

router
  .route("/")
  .get(
    [
      query("page").optional().isInt().withMessage("page must be a number"),
      query("perPage")
        .optional()
        .isInt()
        .withMessage("perPage must be a number"),
      query("searchUrl")
        .optional()
        .isString()
        .withMessage("searchUrl must be a string"),
      body("userId")
        .optional()
        .isNumeric()
        .withMessage("userId must be a numeric"),
    ],
    validate,
    searchUrls
  )
  .post(
    [
      body("originalUrl")
        .notEmpty()
        .withMessage("originalUrl must not be empty")
        .isURL()
        .withMessage("originalUrl must be a valid url"),
      body("shortUrl")
        .notEmpty()
        .withMessage("shortUrl must not be empty")
        .isString()
        .withMessage("shortUrl must be a string"),
      body("userId")
        .notEmpty()
        .withMessage("userId must not be empty")
        .isNumeric()
        .withMessage("userId must be a numeric"),
    ],
    validate,
    createShortUrl
  );

router
  .route("/:id")
  .put(
    [
      param("id").isInt().withMessage("id must be a number"),
      body("userId")
        .notEmpty()
        .withMessage("userId must not be empty")
        .isNumeric()
        .withMessage("userId must be a numeric"),
      body("shortUrl")
        .optional()
        .isString()
        .withMessage("shortUrl must be a string"),
    ],
    validate,
    modifyShortUrl
  )
  .delete(
    [param("id").isInt().toInt().withMessage("id must be a number")],
    validate,
    deleteShortUrl
  );

module.exports = router;
