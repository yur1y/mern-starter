const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const {Comment, validate} = require('../models/comment');
const express = require('express');
const sanitizeHtml = require('sanitize-html');

const router = express.Router();

router.get('/', [admin, auth], async (req, res) => {
    const comment = await Comment.find().sort('createdAt');
    res.send(comment);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const comment = await Comment.find({postId: req.params.id}).sort('createdAt').select('-__v');

    res.send(comment);
});

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {text, userId, postId} = req.body;
    let comment = new Comment({text: sanitizeHtml(text), userId, postId});
    comment = await comment.save();

    res.send(comment);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const {text} = req.body;
    const comment = await Comment.findByIdAndUpdate(req.params.id, {text}, {
        //return updated comment object
        new: true
    });

    if (!comment) return res.status(404).send('The comment with the given ID was not found.');

    res.send(comment);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const comment = await Comment.findByIdAndRemove(req.params.id);

    if (!comment) return res.status(404).send('The post with the given ID was not found.');

    res.send(comment);
});


module.exports = router;