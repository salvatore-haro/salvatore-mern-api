const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerDefinition = require("../swagger/definition");

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ["src/routes/*.js"],
});
const options = {
  customCssUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.css",
  customCss:
    ".opblock-summary-path span {word-break: normal;display: block;width: 300px;}",
};

router.use("/", swaggerUI.serve);
router.get("/", swaggerUI.setup(specs, options));

module.exports = router;
