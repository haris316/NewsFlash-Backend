const mongoose = require("mongoose");
const UserSchema = require("./User");
const CommentSchema = require("./Comment");
const CategorySchema = require("./Category");
// const MediaSchema = require("./Media");
const { MediaSchema } = require(__dirname + '/Media.js').schema;
const CompanySchema = require("./Company");
const HashtagSchema = require("./Hashtag");


const NewsArticleSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
        required: true
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        default: [],
        ref: "CommentSchema",
    },
    is_deleted: {
        type: Boolean,
        default: false,
        required: false
    },
    createdDate: {
        type: Date,
        required: false,
        default: Date.now(),
    },
    body: {
        type: [String],
        required: true,
    },
    body_full: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    categories: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "CategorySchema",
        required: false,
        default: []
    },
    counts: {
        characters: { type: Number, default: 0, required: true },
        sentences: { type: Number, default: 0, required: true },
        paragraphs: { type: Number, default: 0, required: true },
        words: { type: Number, default: 0, required: true }
    },
    hashtags: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "HashtagSchema",
        required: false,
        default: []
    },
    keywords: {
        type: [String],
        required: false,
        default: []
    },
    links: {
        type: [String],
        required: false,
        default: []
    },
    media: {
        type: [MediaSchema],
        required: false,
        default: []
    },
    sentiment: {
        polarity: [{
            type: { type: String, default: "", required: false },
            score: { type: Number, default: 0, required: false }
        }],
    },
    social: {
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
        }
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "CompanySchema",
    },

});

const NewsArticleModel = new mongoose.model("news_article", NewsArticleSchema);

module.exports = NewsArticleModel;
