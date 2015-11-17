var mongoose = require('mongoose'),
    passport = require('passport'),
    localPassport = require('passport-local'),
    crypto = require('crypto');

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
        salt: String,
        hashPass: String
    });

    userSchema.method({
        authenticate: function (password) {
            if (generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            } else {
                return false;
            }
        }
    });

    var User = mongoose.model('User', userSchema);
    User.find({}).exec(function (err, collection) {
        if(err){
            console.log('cannot find users' + err);
            return
        }
        if (collection.length === 0){
            var salt;
            var hashedPassword;

            salt = generateSalt();
            hashedPassword = generateHashedPassword(salt, '123');
            User.create({userName: 'test', firstName: 'testa', lastName: 'testaa', salt: salt, hashPass:hashedPassword});

            salt = generateSalt();
            hashedPassword = generateHashedPassword(salt, '1234');
            User.create({userName: 'test1', firstName: 'testa1', lastName: 'testaa1', salt: salt, hashPass:hashedPassword});
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

function generateSalt () {
    return crypto.randomBytes(128).toString('base64');
}

function generateHashedPassword (salt, password) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(password).digest('hex');
}