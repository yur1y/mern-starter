const winston = require('winston');

//async errors handling
require('express-async-errors');

// save handled logs to logfile.log,
// uncaught exceptions to uncaughtExceptions.log.
// all unhandled errors are thrown.
// all errors are printed in console
module.exports = function() {
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    winston.add(winston.transports.File, { filename: 'logfile.log' });


}