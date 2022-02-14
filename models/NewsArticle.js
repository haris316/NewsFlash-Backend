const mongoose = require("mongoose");
const UserSchema = require("./User");
const CommentSchema = require("./Comment");
const CategorySchema = require("./Category");
const HashtagSchema = require("./Hashtag");
const MediaSchema = require("./Media");
const SentimentSchema = require("./Sentiment");
const SocialSchema = require("./Social");
const CompanySchema = require("./Company");

const NewsArticleSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
    required:true
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
    default: [],
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  body:{
      type:String,
      required:true,
  },
  title:{
    type:String,
    required:true,
},
summary:{
    type:String,
    required:true,
},
  categories:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:"CategorySchema",
    required:false,
},
counts:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:"CountSchema",
    required:true
},
hashtags:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:"HashtagSchema",
    required:false
},
keywords:{
    type:[String],
    required:true,
},
search_string:{
    type:String,
    required:true,
},
links:{
    type:[String],
    required:false,
},
media:{
    type:[mongoose.Schema.Types.ObjectId],
    required:false,
    ref:"MediaSchema"
},
sentiment:{
    type:[mongoose.Schema.Types.ObjectId],
    required:false,
    ref:"SentimentSchema"
},
social:{
    type:[mongoose.Schema.Types.ObjectId],
    required:false,
    ref:"SocialSchema"
},
company:{
    type:[mongoose.Schema.Types.ObjectId],
    required:false,
    ref:"CompanySchema"
},
  
});

const NewsArticleModel = new mongoose.model("news_article", NewsArticleSchema);

module.exports = NewsArticleModel;
