const mongoose = require("mongoose");
const newsPostSchema = require("./NewsPost");
const newsArticleSchema = require("./NewsArticle");
const companySchema = require("./Company");
const smallUserSchema = require(__dirname + '/SmallUser.js').schema;

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
    enum: ["user", "admin", "company"],
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
    type: [mongoose.Schema.Types.ObjectId],
    ref: "newsPostSchema",
    default: [],
    required: false
  },
  pins: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "newsArticleSchema",
    default: [],
    required: false
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companySchema",
    default: null,
    required: false
  },
  news_stand: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "companySchema",
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
  requests_sent: [{
    user: { type: smallUserSchema, required: true },
    my_handshake: { type: Boolean, required: true },
    target_handshake: { type: Boolean, required: true },
  }],
  requests_recieved: [{
    user: { type: smallUserSchema, required: true },
    my_handshake: { type: Boolean, required: true },
    target_handshake: { type: Boolean, required: true },
  }],
});

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;
