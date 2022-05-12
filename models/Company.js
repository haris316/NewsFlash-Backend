const mongoose = require("mongoose");
const NewsArticleSchema = require("./NewsArticleSchema");

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      avatar_url: {
        type: String,
        default:"https://cdn-icons.flaticon.com/png/512/2102/premium/2102647.png?token=exp=1645268987~hmac=6d3017f0a434c45a93855d8cd02ab28b",
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
        type: [NewsArticleSchema],
        required:false,
        default:[]
      },
});

const companyModel = new mongoose.model("company", companySchema);

module.exports = companyModel;
