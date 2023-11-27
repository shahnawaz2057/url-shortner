const express = require("express");
const { body, query, param } = require("express-validator");

const {
  createUser,
  fetchUsers,
  fetchUser,
  updateUser,
} = require("../controllers/userController");
const validate = require("../middlewares/validateMiddleware");
const { authenticateUser } = require('../middlewares/authMiddleware');


const router = express.Router();

/**
 * A User type
 * @typedef {object} User
 * @property {string} name.required - The name
 * @property {string} email.required - The email
 */

/**
 * A User type
 * @typedef {object} CreateUser
 * @property {string} name.required - The name
 * @property {string} email.required - The email
 * @property {string} password.required - The email
 */

/**
 * GET /api/users
 * @summary List of users
 * @tags users - Manage users
 * @return {array<User>} 200 - success response - application/json
 */

/**
 * GET /api/users/{id}
 * @summary Get user by id
 * @tags users
 * @param {number} id.path.required
 * @return {User} 200 - success response - application/json
 */

/**
 * PUT /api/users/{id}
 * @summary Update user
 * @tags users
 * @param {number} id.path.required
 * @param {User} request.body.required - User info
 * @return {User} 200 - success response - application/json
 */

/**
   * POST /api/users
   * @summary Create user
   * @tags users
   * @param {CreateUser} request.body.required - User info
   * @return {User} 200 - User response
   */

/**
   * DELETE /api/users/{id}
   * @summary Delete user
   * @tags users
   * @param {number} id.path.required
   * @return {string} 200 - user deleted
   */

router.use(authenticateUser);

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
