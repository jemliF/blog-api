const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var AuthorSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        dropDups: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Author', AuthorSchema);