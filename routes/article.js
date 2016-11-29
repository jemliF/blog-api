const express = require('express');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();
const Article = require('../models/Article');
const Author = require('../models/Author');

var jsonParser = bodyParser.json();

router.get('/articles', function (req, res, next) {
    Article.find({}, function (err, docs) {
        if (err) {
            res.status(500).send(JSON.stringify(err));
        } else {
            res.json(docs);
        }
    });
});

router.get('/articles/:id', function (req, res, next) {
    Article.findOne({_id: req.params.id}, function (err, doc) {
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

router.post('/articles', jsonParser, function (req, res, next) {
    var article = new Article();
    console.log(req.body);
    article.title = req.body.title;
    article.content = req.body.content;
    article.createdAt = req.body.createdAt;
    article.tags = req.body.tags;
    Author.findOne({_id: req.body.author}, function (err, doc) {
        if (err) {
            res.status(500).send(JSON.stringify(err));
        } else {
            if (doc) {
                var author = new Author();
                author.firstname = doc.fitsname;
                author.lastname = doc.lastname;
                author.email = doc.email;
                author.password = doc.password;

                article.author = author._id;
                article.save(function (err, response) {
                    if (err) {
                        console.error(err);
                        res.status(500).send(JSON.stringify(err));
                    } else {
                        res.status(200).send(JSON.stringify(response));
                    }
                });
            } else {
                res.status(404);
            }
        }
    });

});

router.put('/articles/:id', jsonParser, function (req, res, next) {
    var id = req.params.id;
    var article = new Article();
    console.log(req.body);
    var newArticle = {};
    newArticle.title = req.body.title;
    newArticle.content = req.body.content;
    newArticle.createdAt = req.body.createdAt;
    newArticle.tags = req.body.tags;

    article.update({_id: id}, newArticle, function (err, response) {
        console.log(JSON.stringify(response));
        console.log(JSON.stringify(err));
        if (err) {
            res.status(500).send(JSON.stringify(err));
        } else {
            res.status(200).send(JSON.stringify(response));
        }
    });
});

router.delete('/articles/:id', function (req, res, next) {
    Article.remove({_id: ObjectId(req.params.id)}, function (err, result) {
        if (err) {
            res.status(500).send(JSON.stringify(err));
        } else {
            res.status(200).send(result);
        }
    }).exec();
});

module.exports = router;