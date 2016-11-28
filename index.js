const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.listen(3000, function () {
    console.log('App listening on http://localhost:3000');
});