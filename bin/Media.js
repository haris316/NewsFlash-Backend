const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["image", "video", "link"],
  },
  url: {
    type: String,
    required: true,
  }
});

const mediaModel = new mongoose.model("media", mediaSchema);

module.exports = mediaModel;
