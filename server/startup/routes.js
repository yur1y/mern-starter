const express = require('express');
const error = require('../middleware/error');
const users = require('../routes/users');
const auth = require('../routes/auth');
const posts =require('../routes/post')
const comments =require('../routes/comment')

module.exports = (app) => {
    app.use(express.json());
     app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/posts',posts)
    app.use('/api/comments',comments)
    app.use(error);
}