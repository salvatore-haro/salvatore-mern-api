const httpStatus = require("http-status");
const { getPaginateParams } = require("../utils/utils");
const Post = require("../models/post.model");

const createPost = async (req, res) => {
    const payload = req.body;
    payload.author = req.userAuth.decoded.userId;
    const post = await Post.create(payload);
    res.status(httpStatus.CREATED).send(post);
};

const deletePost = async (req, res) => {
  const postId = req.params.postId;
  const userAuth = req.userAuth;
  const post = await Post.findById(postId);
  if (post && userAuth && post.author.toString() === userAuth.decoded.userId) {
    await Post.findByIdAndDelete(postId);
    res.status(httpStatus.NO_CONTENT).send();
  } else {
    res.status(httpStatus.UNAUTHORIZED).send();
  }
};

const getPosts = async (req, res) => {
  const { filters, options } = getPaginateParams(req, ["title", "topic"]);
  options.excludeFields = req.userAuth ? [] : ['content_value'];
  options.populate = req.userAuth ? "author.username,author.email" : "author.username";
  const result = await Post.paginate(filters, options);
  res.send(result);
};

const getPost = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    res.status(httpStatus.NOT_FOUND).send({});
  } else {
    res.send(post);
  }
};

module.exports = {
  createPost,
  deletePost,
  getPosts,
  getPost,
};
