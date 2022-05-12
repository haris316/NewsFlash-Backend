const mongoose = require("mongoose");
const newsArticleSchema = require("./NewsArticleSchema");
const newsPostSchema = require("./NewsPostSchema");
const smallUserSchema = require("./SmallUser");
const smallCompanySchema = require("./SmallCompany");

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
    default: "https://cdn-icons.flaticon.com/png/512/2102/premium/2102647.png?token=exp=1645268987~hmac=6d3017f0a434c45a93855d8cd02ab28b"
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
    enum: ["user", "admin"],
    default: "user",
  },
  createdDate: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  is_deleted: {
    type: Boolean,
    default: false,
    required: false
  },
  opinions: {
    type: [newsPostSchema],
    default: [],
    required: false
  },
  news_articles: {
    type: [newsArticleSchema],
    default: [],
    required: false
  },
  pins: {
    type: [newsArticleSchema],
    default: [],
    required: false
  },
  company: {
    type: smallCompanySchema,
    default: null,
    required: false
  },
  news_stand: {
    type: [smallCompanySchema],
    default: [],
    required: false
  },
  followers: {
    type: [smallUserSchema],
    required: false,
    default: [],
  },
  following: {
    type: [smallUserSchema],
    required: false,
    default: [],
  },
  requests_sent: {
    type: [{
      user: { type: smallUserSchema, required: true },
      my_handshake: { type: Boolean, required: true },
      target_handshake: { type: Boolean, required: true },
    }],
    required: false,
    default: [],
  },
  requests_recieved: {
    type: [{
      user: { type: smallUserSchema, required: true },
      my_handshake: { type: Boolean, required: true },
      target_handshake: { type: Boolean, required: true },
    }],
    required: false,
    default: []
  }
});

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;
