const express = require('express');
const error = require('../middleware/error');
const users = require('../routes/users');
const auth = require('../routes/auth');
const posts =require('../routes/post')
const cors = require('cors');

module.exports = (app) => {
    app.use(cors());
    app.use(express.json());
     app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/posts',posts)
    app.use(error);
}