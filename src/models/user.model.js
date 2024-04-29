const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const paginate = require("./plugins/paginate.plugin");
const toJSON = require("./plugins/toJSON.plugin");

// Schema
const schema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
});

schema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
});

// Plugins
schema.plugin(toJSON);
schema.plugin(paginate);

// Utilities
schema.statics.isUsernameTaken = async function (username) {
  return !!(await this.findOne({ username }));
};
schema.statics.isEmailTaken = async function (email) {
  return !!(await this.findOne({ email }));
};

schema.methods.isValidPassword = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

// Listeners
schema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

module.exports = mongoose.model("User", schema);
