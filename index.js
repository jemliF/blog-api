const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoConfig = require('./config/mongo');

const authors = require('./routes/author');
const articles = require('./routes/article');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

mongoose.connect(mongoConfig.url);

app.use('/api/v1/', authors);
app.use('/api/v1/', articles);

app.listen(3000, function () {
    console.log('App listening on http://localhost:3000');
});