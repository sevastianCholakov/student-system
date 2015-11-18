var passport = require('passport'),
    localPassport = require('passport-local'),
    User = require('mongoose').model('User');

module.exports = function () {
    passport.use(new localPassport(function(username,password, done){
        User.findOne({userName: username}).exec(function (err, user) {
            if (err) {
                console.log('error loading user' + err)
                return;
            }
            if(user && user.authenticate(password)) {
                return done(null, user);
            } else{
                return done(null, false);
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
    });
};