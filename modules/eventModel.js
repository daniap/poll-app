/**
 * Created by dainis on 27/01/16.
 */
var mongoose = require('mongoose');

var eventSchema = mongoose.Schema ({
    "awayName": String,
    "createdAt": Date,
    "group": String,
    "homeName": String,
    "id": Number,
    "name": String,
    "objectId": String,
    "sport": String,
    "start": Date,
    "state": String,
    "updatedAt": Date
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
