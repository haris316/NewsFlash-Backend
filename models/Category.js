const mongoose = require("mongoose");
const HashtagSchema = require("./Hashtag");

const categorySchema = {
  name: {
    type: String,
    required: true,
  },
  hashtags: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
    ref:"HashtagSchema"
  },
  keywords: {
    type: [String],
    required: false,
  },
};

const categoryModel = new mongoose.model("category", categorySchema);

module.exports = categoryModel;
