const mongoose = require("mongoose");
// const UserSchema = require("./User");
const CommentSchema = require("./Comment");
const NewsArticleSchema = require("./NewsArticleSchema");
const smallUserSchema = require("./SmallUser");

const NewsPostSchema = new mongoose.Schema({
  user: {
    type: smallUserSchema,
    ref: "UserSchema",
    required: true,
  },
  opinion_text: {
    type: String,
    required: false,
    default: ""
  },
  article: {
    type: NewsArticleSchema,
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
    type: [CommentSchema],
    required: false,
    default: [],
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now(),
  }
});

const NewsPostModel = new mongoose.model("news_post", NewsPostSchema);

module.exports = NewsPostModel;
