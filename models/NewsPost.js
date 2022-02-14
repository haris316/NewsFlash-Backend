const mongoose = require("mongoose");
const UserSchema = require("./User");
const CommentSchema = require("./Comment");
const NewsArticleSchema = require("./NewsArticle");

const NewsPostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
    required: true,
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NewsArticleSchema",
    required: true,
  },
  upvote: {
    type: Number,
    required: false,
    default: 0,
  },
  downvote: {
    type: Number,
    required: false,
    default: 0,
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
    default: [],
  },
});

const NewsPostModel = new mongoose.model("news_post", NewsPostSchema);

module.exports = NewsPostModel;
