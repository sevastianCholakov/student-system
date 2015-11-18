var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once('open', function (err) {
        if (err) {
            console.log('Database could not be opened ' + err);
            return;
        }
        console.log('db running');
    });

    db.on('error', function (err) {
        console.log('Database error: ' + err);
    });

    var userSchema = mongoose.Schema({
        userName: String,
        firstName: String,
        lastName: String,
        salt: String,
        hashPass: String,
        roles: [String]
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
        if (err) {
            console.log('cannot find users' + err);
            return
        }

        //User.remove({}, function () {
        //
        //});

        if (collection.length === 0) {
            var salt;
            var hashedPassword;

            salt = generateSalt();
            hashedPassword = generateHashedPassword(salt, 'admin');
            User.create({
                userName: 'admin',
                firstName: 'admin',
                lastName: 'adminov',
                salt: salt,
                hashPass: hashedPassword,
                roles: ['admin']
            });

            salt = generateSalt();
            hashedPassword = generateHashedPassword(salt, 'user');
            User.create({
                userName: 'user',
                firstName: 'user',
                lastName: 'userov',
                salt: salt,
                hashPass: hashedPassword,
                roles: ['standard']
            });
            console.log('users added to db');
        }
    });

    function generateSalt() {
        return crypto.randomBytes(128).toString('base64');
    }

    function generateHashedPassword(salt, password) {
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(password).digest('hex');
    };
};