const mongoose = require("mongoose");
const newsPostSchema = require("./NewsPost");
const newsArticleSchema = require("./NewsArticle");
const companySchema = require("./Company");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
    enum: ["user", "admin", "company"],
    default: "user",
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  news_posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "newsPostSchema",
  },
  news_articles: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "newsArticleSchema",
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companySchema",
    default:null,
    required:false
  },
});

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;
