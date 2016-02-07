var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var router = express.Router();
var db = require('../database.js');
var Event = require("../models/eventModel");
var User = require("../models/userModel");
var importdata = require("../service/importdata");

//return index page
router.get('/', function (req, res) {
   res.render('index');
});

//import and update events
router.get('/import', function (req, res) {
    importdata();
});

//add new user
router.post('/users', function (req, res) {
    var body = _.pick(req.body, 'mail', 'firstName', 'lastName', 'genre');
    var newuser = User({
        "mail": body.mail,
        "firstName": body.firstName,
        "lastName": body.lastName,
        "genre": body.genre
    })
    newuser.save(function(err, data) {
        if (err) throw err;
        res.status(200).send();
    })
});

//save votes
router.post('/votes', function (req, res) {

    var body = _.pick(req.body, 'vote', 'byUser', 'eventid');

    console.log('sutam sos datus' + req.body);

    Event.findOneAndUpdate({objectId: body.eventid},
                        {$push: {votes: {
                                    vote: body.vote,
                                    votedBy: body.byUser
                                }}},
                        {upsert: true}, function(err, data) {
                            if (err) {
                                res.status(500).send();
                                console.log(err);
                            }
                            var results = {};
                            data.votes.forEach(function(x) { results[x.vote] = (results[x.vote] || 0)+1; });
                            res.json(JSON.stringify(results));
                            console.log(data);
                        });
});

//return events data
router.get('/events', function(req, res) {
    Event.find({}, function (err, data) {
        if(err) return;
        res.json(data);
    });
});

module.exports = router;
