const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
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
      //Either
      news_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "newsPostSchema",
      },
      //Or
      news_article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "newsArticleSchema",
      },
});

const commentModel = new mongoose.model("comment", commentSchema);

module.exports = commentModel;
