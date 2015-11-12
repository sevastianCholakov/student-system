var express = require('express');
var stylus = require('stylus');
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || 'development';
var path = require('path');
var app = express();
var port = '3030';

// set view engine and location
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// set body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// config stylus
app.use(stylus.middleware({
    src: __dirname,
    compile: function(str, path){
        return stylus(str).set('filename', path);
    }
}));
// set client file location
app.use(express.static(path.join(__dirname, '../client')));

// set default route
app.get('*', function (req, res) {
    res.render('index');
})

app.listen(port);
console.log("Server running on port " + port);
