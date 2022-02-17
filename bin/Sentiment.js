const mongoose = require("mongoose");

const sentimentSchema = new mongoose.Schema({
    polarity:{
        type:String,
        required:true,
    },
    score:{
        type:Number,
        required:true,
        default:0
    }
});

const sentimentModel = new mongoose.model("sentiment", sentimentSchema);

module.exports = sentimentModel;
