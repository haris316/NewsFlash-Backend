const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
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
      createdDate: {
        type: Date,
        required: false,
        default: Date.now(),
      },
      is_deleted: {
        type: Boolean,
        default: false,
      },
      news_articles: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "newsArticleSchema",
        required:false,
        default:[]
      },
});

const companyModel = new mongoose.model("company", companySchema);

module.exports = companyModel;
