module.exports = function (app) {
    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render('partials/' + req.params.partialArea + '/' + req.params.partialName)
    });

    // set default route
    app.get('*', function (req, res) {
        res.render('index');
    });
}