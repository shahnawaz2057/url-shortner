const express = require('express');
const { createUser, fetchUsers, fetchUser, updateUser, deleteUser } = require('../controllers/user.controller')

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

router.route('/')
.get(fetchUsers)
.post(createUser);

router.route('/:id')
.get(fetchUser)
.put(updateUser)
.delete(deleteUser);

module.exports = router;
