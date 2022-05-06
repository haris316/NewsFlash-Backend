const mongoose = require("mongoose");

const hashtagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  count: {
    type: Number,
    required: false,
    default: 1,
  },
  isHyped: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const hashtagModel = new mongoose.model("hashtag", hashtagSchema);

module.exports = hashtagModel;
