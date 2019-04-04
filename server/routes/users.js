const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {name, email, password} = req.body;
    let user = await User.findOne({email});
    if (user) return res.status(400).send('User already registered.');

    user = new User({name, email, password});
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();

    res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(user);

});

module.exports = router;
