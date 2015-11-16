var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');


module.exports = {
    rootPath: rootPath,
    db: 'mongodb://admin:admin1@ds047524.mongolab.com:47524/student-system',
    port: process.env.PORT || '3030'
};