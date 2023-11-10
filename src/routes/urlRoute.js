const express = require("express");
const { body, query, param } = require("express-validator");

const {
  createShortUrl,
  fetchUrls,
  modifyShortUrl,
  deleteShortUrl,
} = require("../controllers/urlController");
const validate = require("../middlewares/validateMiddleware");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Url:
 *       type: object
 *       properties:
 *         originalUrl:
 *           type: string
 *           description: Long url.
 *           example: https://jnj.com/.....
 *         shortUrl:
 *           type: string
 *           description: Short url name.
 *           example: Branding
 */

/**
 * @swagger
 * /api/urls:
 *   get:
 *     summary: List of urls
 *     description: Retrieve a list of urls.
 *     tags:
 *      - urls
 *     responses:
 *       200:
 *         description: ok.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Url'
 */

/**
 * @swagger
 * /api/urls/{shortUrl}:
 *   get:
 *     summary: Get url by short name
 *     description: Retrieve url by short name
 *     tags:
 *      - urls
 *     responses:
 *       200:
 *         description: ok.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Url'
 */

/**
 * @swagger
 * /api/urls/{shortUrl}:
 *   put:
 *     summary: Modify url
 *     description: Modify url by short name and user Id
 *     tags:
 *      - urls
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         required: true
 *         description: Name of the short url to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               newName:
 *                 type: string
 *     responses:
 *       200:
 *         description: ok.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Url'
 */

/**
 * @swagger
 * /api/urls:
 *   post:
 *     summary: Create short url
 *     tags:
 *      - urls
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *               shortUrl:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: short url created.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Url'
 */

/**
 * @swagger
 * /api/urls/{id}:
 *   delete:
 *     summary: Delete url by short name
 *     tags:
 *      - urls
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         required: true
 *         description: short url name to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router
  .route("/")
  .get(
    [
      query("page").optional().isInt(),
      query("perPage").optional().isInt(),
      query("searchUrl").optional().isString(),
    ],
    validate,
    fetchUrls
  )
  .post(
    [
      body("originalUrl").notEmpty().isURL(),
      body("shortUrl").notEmpty().isString(),
      body("userId").notEmpty().isNumeric(),
    ],
    validate,
    createShortUrl
  );

router
  .route("/:id")
  .put(
    [
      param("id").isInt(),
      body("userId").notEmpty().isNumeric(),
      body("shortUrl").optional().isString(),
    ],
    validate,
    modifyShortUrl
  )
  .delete([param("id").isInt().toInt()], validate, deleteShortUrl);

module.exports = router;
