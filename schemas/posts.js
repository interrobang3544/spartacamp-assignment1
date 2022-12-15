const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  createdAt: {
    type: String
  },
});

module.exports = mongoose.model("posts", postsSchema);