var express = require('express');
var stylus = require('stylus');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || 'development';
var path = require('path');
var app = express();
var port = process.env.PORT || '3030';
var messageFromDataBase;

// set body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// set file location
//app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(__dirname));
mongoose.connect('mongodb://admin:admin1@ds047524.mongolab.com:47524/student-system');
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

var messageSchema = mongoose.Schema({
    message: String
});

var Message = mongoose.model('Message', messageSchema);

Message.remove({}).exec(function(err){
   if(err) {
       console.log('Messages could not be cleared' + err);
   }
    console.log('messages deleted');
    Message.create({message: 'Hi from mongoose'})
        .then(function(model){
            messageFromDataBase = model.message;
            console.log(model.message)
        });
});

// set view engine and location
app.set('view engine', 'jade');
app.set('views', __dirname + '/server/views');

// config stylus
app.use(stylus.middleware({
    src: __dirname + '/client',
    compile: function(str, path){
        return stylus(str).set('filename', path);
    }
}));

app.get('/partials/:partialName', function (req, res) {
    res.render('partials/' + req.params.partialName)
});

// set default route
app.get('*', function (req, res) {
    res.render('index', {message: messageFromDataBase});
});


app.listen(port);
console.log("Server running on port " + port);
