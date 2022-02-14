const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema({
  facebook_count: {
    type: Number,
    default: 0,
    required: false,
  },
  google_count: {
    type: Number,
    default: 0,
    required: false,
  },
  twitter_count: {
    type: Number,
    default: 0,
    required: false,
  },
  reddit_count: {
    type: Number,
    default: 0,
    required: false,
  },
  other_count: {
    type: Number,
    default: 0,
    required: false,
  },
});

const socialModel = new mongoose.model("social", socialSchema);

module.exports = socialModel;
