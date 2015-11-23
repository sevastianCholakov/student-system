var auth = require('./auth'),
    userCtrl = require('../controllers/usersController'),
    courseCtrl = require('../controllers/coursesController');

module.exports = function(app) {
    app.get('/api/users', auth.isInRole('admin'), userCtrl.getAllUsers);
    app.post('/api/users', userCtrl.createUser);
    app.put('/api/users', auth.isAuthenticated, userCtrl.updateUser);

    app.get('/api/courses', courseCtrl.getAllCourses);
    app.get('/api/courses/:id', courseCtrl.getCourseById);

    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('/api/*', function(req, res) {
        res.status(404);
        res.end();
    })

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
}