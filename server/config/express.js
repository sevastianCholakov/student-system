var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser');

module.exports = function (app, config) {
    // set view engine and location
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');

    // set body parser
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    // config stylus
    app.use(stylus.middleware({
        src: config.rootPath + '/client',
        compile: function(str, path){
            return stylus(str).set('filename', path);
        }
    }));
    app.use(express.static(config.rootPath));
};