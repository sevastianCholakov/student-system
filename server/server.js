var express = require('express');

var env = process.env.NODE_ENV || 'development';

var app = express();
var port = '3030';

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('*', function (req, res) {
    res.render('index');
})

app.listen(port);
console.log("Server running on port " + port);