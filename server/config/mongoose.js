var mongoose = require('mongoose'),
    passport = require('passport'),
    localPassport = require('passport-local');

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

    var userSchema =  mongoose.Schema({
        userName: String,
        firstName: String,
        lastName: String,
       // salt: String,
       // hashPass: String
    });

    var User = mongoose.model('User', userSchema);
    User.find({}).exec(function (err, collection) {
        if(err){
            console.log('cannot find users' + err);
            return
        }
        if (collection.length === 0){
            User.create({userName: 'userNameTest', firstName: 'firstNameTest', lastName: 'lastNameTest'});
            User.create({userName: 'userNameTest1', firstName: 'firstNameTest1', lastName: 'lastNameTest1'});
            User.create({userName: 'userNameTest22', firstName: 'firstNameTest22', lastName: 'lastNameTest2'});
            console.log('users added to db');
        }
    })

    passport.use(new localPassport(function(username,password, done){
        User.findOne({userName: username}).exec(function (err, user) {
            if (err) {
                console.log('error loading user' + err)
                return;
            }
            if(user) {
                return done(null, user);
            } else{
                return done(null, user);
            }
        });
    }));

    passport.serializeUser(function (user, done) {
        if(user) {
            return done(null, user.id);
        }
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}).exec(function (err, user) {
            if (err) {
                console.log('error loading user' + err)
                return;
            }
            if(user) {
                return done(null, user);
            } else{
                return done(null, user);
            }
        })
    })
};