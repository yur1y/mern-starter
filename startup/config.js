const config = require('config');
var fs = require('fs');

module.exports = function() {
    if (!config.get('db')) {
        throw new Error('FATAL ERROR: db is not defined.');
    }

    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }

}