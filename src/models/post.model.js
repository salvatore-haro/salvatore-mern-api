const mongoose = require('mongoose');
const paginate = require("./plugins/paginate.plugin");
const toJSON = require("./plugins/toJSON.plugin");

// Schema
const schema = new mongoose.Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true },
  content_type: { type: String, required: true },
  content_value: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

// Plugins
schema.plugin(toJSON);
schema.plugin(paginate);

module.exports = mongoose.model('Post', schema);