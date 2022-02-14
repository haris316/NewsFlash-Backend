const mongoose = require("mongoose");

const hashtagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  isHyped: {
    type: Boolean,
    default: false,
  },
});

const hashtagModel = new mongoose.model("hashtag", hashtagSchema);

module.exports = hashtagModel;
