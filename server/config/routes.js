var passport = require('passport');
var auth = require('./auth');

module.exports = function (app) {
    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render('partials/' + req.params.partialArea + '/' + req.params.partialName)
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    // set default route
    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
};