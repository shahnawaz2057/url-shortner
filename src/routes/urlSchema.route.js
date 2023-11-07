const express = require('express');
const { createShortUrl, fetchUrls, modifyShortUrl, reDirectToOrignalUrl, deleteShortUrl } = require('../controllers/urlSchema.controller')

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UrlSchema:
 *       type: object
 *       properties:
 *         orignalUrl:
 *           type: string
 *           description: Long url.
 *           example: https://jnj.com/.....
 *         shortUrlName:
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
 *                 $ref: '#/components/schemas/UrlSchema'
 */

/**
 * @swagger
 * /api/urls/{shortUrlName}:
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
 *                 $ref: '#/components/schemas/UrlSchema'
 */

/**
 * @swagger
 * /api/urls/{shortUrlName}:
 *   put:
 *     summary: Modify url
 *     description: Modify url by short name and user Id
 *     tags:
 *      - urls
 *     parameters:
 *       - in: path
 *         name: shortUrlName
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
 *                 $ref: '#/components/schemas/UrlSchema'
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
 *               orignalUrl:
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
 *                 $ref: '#/components/schemas/UrlSchema'
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
 *         name: shortUrlName
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

router.route('/')
.get(fetchUrls)
.post(createShortUrl)

router.route('/:shortUrlName')
.get(reDirectToOrignalUrl)
.put(modifyShortUrl)
.delete(deleteShortUrl);

module.exports = router;