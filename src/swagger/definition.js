const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "Salvatore MERN API documentation",
  },
  servers: [
    {
      url: `/api`,
    },
  ],
  security: [
    {
      JWTAuth: [],
    },
  ],
  components: {
    securitySchemes: {
      JWTAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

module.exports = swaggerDef;
