var fetch = require('node-fetch');
var db = require('../database.js');
var Event = require("../models/eventModel");

//import new objects or update if needed
var importevents = function(req, res) {
    fetch('https://api.parse.com/1/classes/events/', {
        method: 'get',
        headers: {
            'X-Parse-Application-Id': 'Yf78y7JmKLvftwIMuTPfDVYj9TbH3SQtEUVDXepj',
            'X-Parse-REST-API-Key': 'x2lBZtK1wudKicoAr3LAJTqdsqMCNdlZrYlvHrlL'
        }
    }).then(function(res) {
        return res.json();
    }).then(function(result) {
        var arr = result.results;
        arr.forEach(function (evt) {
            Event.findOneAndUpdate({objectId: evt.objectId}, evt, {upsert:true}, function(err, doc) {
                if(err) {
                    res.status(500).send();
                }
            });
        });
    }).catch(function(ex) {
        console.log('parsing failed', ex)
    });
}

module.exports = importevents;
