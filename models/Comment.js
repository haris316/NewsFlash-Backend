const mongoose = require("mongoose");
const smallUserSchema = require("./SmallUser");

const commentSchema = new mongoose.Schema({
  user: {
    type: smallUserSchema,
    required: true,
  },
  body: {
    type: String,
    required: true,
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
});

// const commentModel = new mongoose.model("comment", commentSchema);

module.exports = commentSchema;
