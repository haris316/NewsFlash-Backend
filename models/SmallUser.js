const mongoose = require("mongoose");

const smallUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    avatar_url: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

module.exports = smallUserSchema;
