const express = require("express");
const httpStatus = require("http-status");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const router = express.Router();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

/**
 * @swagger
 * tags:
 *   name: Authentication
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Inicio de sesión exitoso
 *       '401':
 *         description: Credenciales inválidas
 */
router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && (await user.isValidPassword(req.body.password))) {
    const token = jwt.sign(
      {
        userId: user._id,
        userName: user.username,
        userEmail: user.email,
        userRole: user.role,
      },
      jwtOptions.secretOrKey
    );
    res.json({ token });
  } else {
    res.status(httpStatus.UNAUTHORIZED).json({ message: "Credenciales invalidas, revisa tu usuario ó contraseña." });
  }
});

module.exports = router;
