const mongoose = require("mongoose");
// const UserSchema = require("./User");
const CommentSchema = require("./Comment");
// const { MediaSchema } = require(__dirname + '/Media.js').schema;
// const CompanySchema = require("./Company");
const smallCompanySchema = require("./SmallCompany");
const smallUserSchema = require("./SmallUser");


const NewsArticleSchema = new mongoose.Schema({
    author: {
        type: smallUserSchema,
        required: true
    },
    comments: {
        type: [CommentSchema],
        required: false,
        default: [],
    },
    upvote: {
        type: [String],
        default: [],
        required: false,
    },
    downvote: {
        type: [String],
        default: [],
        required: false,
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
    counts: {
        characters: { type: Number, default: 0, required: true },
        sentences: { type: Number, default: 0, required: true },
        paragraphs: { type: Number, default: 0, required: true },
        words: { type: Number, default: 0, required: true }
    },
    hashtags: {
        type: [String],
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
        type: [String],
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
        type: smallCompanySchema,
        required: false,
    },
    toProcess: {
        type: Boolean,
        required: false,
        default: true,
    },

});

const NewsArticleModel = new mongoose.model("news_article", NewsArticleSchema);

module.exports = NewsArticleModel;
