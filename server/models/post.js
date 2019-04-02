const Joi = require('joi');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    content:
        {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 8192
        },
    slug: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    userId:{
        type:String,
        required:true
    }
});

const Post = mongoose.model('Post', postSchema);

function validatePost(post) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        content: Joi.string().min(1).max(8192).required(),
        userId:Joi.string().required(),
        createdAt: Joi.string(),
        slug:Joi.string()
    };

    return Joi.validate(post, schema);
}

exports.postSchema = postSchema;
exports.Post = Post;
exports.validate = validatePost;
