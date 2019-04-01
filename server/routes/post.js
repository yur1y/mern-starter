const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const {Post, validate} = require('../models/post');
const express = require('express');
const router = express.Router();
const slug = require('limax');
const sanitizeHtml =require('sanitize-html');

router.get('/', async (req, res) => {
    const post = await Post.find().sort('createdAt');
    res.send(post);
});

router.get('/:id', [auth, validateObjectId], async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).send('The post with the given ID was not found.');

    res.send(post);
});

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {name,content} =req.body;
    let post = await Post.findOne({name});

    if (post) return res.status(400).send('Post with the same name already exist.');

    post = new Post({name:sanitizeHtml(name), content:sanitizeHtml(content), slug:slug(name.toLowerCase(), { lowercase: true })});
    post = await post.save();

    res.send(post);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const {name,content} = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, {name, content}, {
        //return updated post object
        new: true
    });

    if (!post) return res.status(404).send('The puppet with the given ID was not found.');

    res.send(post);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const post = await Post.findByIdAndRemove(req.params.id);

    if (!post) return res.status(404).send('The post with the given ID was not found.');

    res.send(post);
});




module.exports = router;