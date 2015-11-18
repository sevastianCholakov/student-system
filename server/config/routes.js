var auth = require('./auth'),
    userController = require('../controllers/userController');

module.exports = function (app) {
    app.get('/api/users', auth.isInRole('admin'), userController.getAllUsers);

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