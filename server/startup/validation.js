const Joi = require('joi');
// Joi is defined globally
module.exports = function() {
    Joi.objectId = require('joi-objectid')(Joi);
}