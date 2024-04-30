const express = require("express");
const router = express.Router();
const { isCreator } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management
 */
const postController = require("../controllers/post.controller");

/**
 * @swagger
 * /posts:
 *   post:
 *     tags: [Posts]
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - topic
 *               - content_type
 *               - content_value
 *             properties:
 *               title:
 *                 type: string
 *               topic:
 *                 type: string
 *               content_type:
 *                 type: string
 *               content_value:
 *                 type: string
 *             example:
 *               title: mazda cx5
 *               topic: cars
 *               content_type: website
 *               content_value: https://www.mazda.mx/vehiculos/cx-5
 *     responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 */
router.post("/", isCreator, postController.createPost);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     tags: [Posts]
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 */
router.get("/:postId", isCreator, postController.getPost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     tags: [Posts]
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 */
router.delete("/:postId", postController.deletePost);

/**
 * @swagger
 * /posts:
 *   get:
 *     tags: [Posts]
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *     responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 */
router.get("/", postController.getPosts);

module.exports = router;
