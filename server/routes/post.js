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

router.get('/:slug', [auth], async (req, res) => {
    const post = await Post.findOne({slug:req.params.slug}).select('-__v');

    if (!post) return res.status(404).send('The post with the given ID was not found.');

    res.send(post);
});

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {title,content,userId} =req.body;
    let post = await Post.findOne({title});
    console.log(req.body)
    if (post) return res.status(400).send('Post with the same name already exist.');

    post = new Post({title:sanitizeHtml(title), content:sanitizeHtml(content), slug:slug(title.toLowerCase(), { lowercase: true }),userId});
    post = await post.save();

    res.send(post);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const {title,content} = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, {title, content}, {
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