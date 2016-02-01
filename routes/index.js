var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var router = express.Router();
var db = require('../database.js');
var Event = require("../models/eventModel");
var importdata = require("../service/importdata");

//return index page
router.get('/', function (req, res) {
   res.render('index');
});

//return index page
router.get('/import', function (req, res) {
    importdata();
});

//return index page
router.post('/vote', function (req, res) {
    var body = _.pick(req.body, 'vote', 'byUser', 'eventid');
    console.log(body);
    db.events.update({objectId: body.eventid},
                        {$push: {votes: {byUser: body.byUser, vote: body.vote}}});
//     Event.update({objectId: body.eventid},{$push: {"votes": {byUser: body.byUser, vote: body.vote}}});
//     // Event.findOneAndUpdate({objectId: body.eventid},
//     //                         {$push: {"votes": {byUser: body.byUser, vote: body.vote}}},
//     //                         {upsert:true, new: true},
//     //                         function(err, doc) {
//     //                             if(err) {
//     //                                 console.log('is errror');
//     //                                 // res.status(500).send();
//     //                             }
//     //                         });
// });
});
//return events data
router.get('/events', function(req, res) {
    Event.find({}, function (err, data) {
        if(err) return;
        res.json(data);
    });
});

module.exports = router;
