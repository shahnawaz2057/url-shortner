const express = require("express");
const { body, query, param } = require("express-validator");

const {
  createUser,
  fetchUsers,
  fetchUser,
  updateUser,
} = require("../controllers/userController");
const validate = require("../middlewares/validateMiddleware");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: user name.
 *           example: Leanne Graham
 *         email:
 *           type: string
 *           description: The user's email.
 *           example: Leanne.Graham@gmail.com
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: List of users
 *     description: Retrieve a list of users.
 *     tags:
 *      - users
 *     responses:
 *       200:
 *         description: ok.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by id
 *     tags:
 *      - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user by id
 *     tags:
 *      - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to be updated.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by id
 *     tags:
 *      - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to be deleted.
 *         schema:
 *           type: integer
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

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create user
 *     tags:
 *      - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: user created.
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
      query("page").optional().isInt().toInt(),
      query("perPage").optional().isInt().toInt(),
      query("search").optional().isString(),
    ],
    validate,
    fetchUsers
  )
  .post(
    [
      body("employeeId").isString().notEmpty(),
      body("name").isString().notEmpty(),
      body("designation").isString().notEmpty(),
    ],
    validate,
    createUser
  );

router
  .route("/:id")
  .get([param("id").isInt().toInt()], validate, fetchUser)
  .put(
    [
      param("id").isInt().toInt(),
      body("isAdmin").optional().isBoolean().toBoolean(),
      body("isActive").optional().isBoolean().toBoolean(),
    ],
    validate,
    updateUser
  );

module.exports = router;
