const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = require('mongoose').Schema;

var ArticleSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        dropDups: true,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [],
        required: false
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }
});

module.exports = mongoose.model('Article', ArticleSchema);