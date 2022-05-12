const mongoose = require("mongoose");

const smallCompanySchema = new mongoose.Schema({
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

module.exports = smallCompanySchema;
