/**
 * Created by dainis on 27/01/16.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema ({
    "mail": String,
    "firstName": String,
    "lastName": String,
    "genre": String,
    "updatedAt": Date,
    "pasword": String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
