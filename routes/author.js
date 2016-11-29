const express = require('express');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();
const Author = require('../models/Author');

var jsonParser = bodyParser.json();

router.get('/authors', function (req, res, next) {
    Author.find({}, function (err, docs) {
        if (err) {
            res.status(500).send(JSON.stringify(err));
        } else {
            res.json(docs);
        }
    });
});

router.get('/authors/:id', function (req, res, next) {
    Author.findOne({_id: req.params.id}, function (err, doc) {
        if (err) {
            res.status(500).send(JSON.stringify(err));
        } else {
            if (doc) {
                res.json(doc);
            } else {
                res.status(404);
            }
        }
    });
});

router.post('/authors', jsonParser, function (req, res, next) {
    var author = new Author();
    console.log(req.body);
    author.firstname = req.body.firstname;
    author.lastname = req.body.lastname;
    author.email = req.body.email;
    author.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);

    author.save(function (err, response) {
        if (err) {
            res.status(500).send(JSON.stringify(err));
        } else {
            res.status(200).send(JSON.stringify(response));
        }
    });
});

router.put('/authors/:id', jsonParser, function (req, res, next) {
    var id = req.params.id;
    var author = new Author();
    console.log(req.body);
    var newAuthor = {};
    newAuthor.firstname = req.body.firstname;
    newAuthor.lastname = req.body.lastname;
    newAuthor.email = req.body.email;
    newAuthor.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);

    author.update({_id: id}, newAuthor, function (err, response) {
        console.log(JSON.stringify(response));
        console.log(JSON.stringify(err));
        if (err) {
            res.status(500).send(JSON.stringify(err));
        } else {
            res.status(200).send(JSON.stringify(response));
        }
    });
});

router.delete('/authors/:id', function (req, res, next) {
    Author.remove({_id: ObjectId(req.params.id)}, function (err, result) {
        if (err) {
            res.status(500).send(JSON.stringify(err));
        } else {
            res.status(200).send(result);
        }
    }).exec();
});

module.exports = router;