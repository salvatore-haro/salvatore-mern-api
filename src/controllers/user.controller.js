const httpStatus = require("http-status");
const { getPaginateParams } = require("../utils/utils");
const User = require("../models/user.model");

const createUser = async (req, res) => {
  if (await User.isUsernameTaken(req.body.username)) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send({
        message: `El username '${req.body.username}' ya está ocupado, utiliza otro.`,
      });
  } else if (await User.isEmailTaken(req.body.email)) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send({
        message: `El email '${req.body.email}' ya está ocupado, utiliza otro.`,
      });
  } else {
    const user = await User.create(req.body);
    res.status(httpStatus.CREATED).send({id: user.id});
  }
};

const getUsers = async (req, res) => {
  const { filters, options } = getPaginateParams(req, ["username", "role"]);
  const result = await User.paginate(filters, options);
  res.send(result);
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.userId);
  await user.populate("posts");
  if (!user) {
    res.status(httpStatus.NOT_FOUND).send({});
  } else {
    res.send(user.toJSON({ virtuals: true }));
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
};
