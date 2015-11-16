var mongoose = require('mongoose');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once('open', function(err){
        if(err){
            console.log('Database could not be opened ' + err);
            return;
        }
        console.log('db running');
    });

    db.on('error', function(err){
        console.log('Database error: ' + err);
    });
}