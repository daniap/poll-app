var mongoose = require('mongoose');

var voteSchema = mongoose.Schema ({
    homeName: Number,
    awayName: Number,
    draw: Number
});

var Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
