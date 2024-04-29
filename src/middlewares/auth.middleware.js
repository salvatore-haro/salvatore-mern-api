const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

const checkJwt = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    req.userAuth = null;
    return next();
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ message: err });
    } else {
      req.userAuth = { decoded };
    }
    next();
  });
};

const isLoggedInRole = (roles) => (req, res, next) => {
  if (!req.userAuth) {
    return res.status(httpStatus.UNAUTHORIZED).json({});
  } else if (!roles.includes(req.userAuth.decoded.userRole)) {
    return res
      .status(httpStatus.FORBIDDEN)
      .json({ message: `You need the '${role}' role.` });
  } else {
    next();
  }
};

const isAdmin = isLoggedInRole(["admin"]);
const isCreator = isLoggedInRole(["creator", "admin"]);
const isReader = isLoggedInRole(["reader", "creator", "admin"]);

module.exports = { checkJwt, isAdmin, isCreator, isReader };
