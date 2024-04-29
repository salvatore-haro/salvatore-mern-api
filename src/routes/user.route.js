const express = require("express");
const router = express.Router();
const { isAdmin } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */
const userController = require("../controllers/user.controller");

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               role:
 *                  type: string
 *                  enum: [user, admin]
 *             example:
 *               username: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: user
 *     responses:
 *          200:
 *              description: Testing User Get
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 */
router.post("/", userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user
 *     tags: [Users]
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *          200:
 *              description: Testing Get
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 */
router.get("/:userId", isAdmin, userController.getUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: User name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: User role
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *          200:
 *              description: Testing Get
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 */
router.get("/", isAdmin, userController.getUsers);

module.exports = router;
