/**
 * Created by dainis on 27/01/16.
 */
var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    "awayName": String,
    "createdAt": Date,
    "group": String,
    "homeName": String,
    "id": String,
    "name": String,
    "objectId": String,
    "sport": String,
    "start": Date,
    "state": String,
    "updatedAt": Date,
    "votes": [{
        vote: String,
        votedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
