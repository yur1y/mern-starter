
const Joi = require('joi');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text:
        {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 8192
        },
    userId:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        required:true,
        default: new Date()
    }
});

const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment) {
    const schema = {
         text:Joi.string().min(1).max(8192).required()
    };

    return Joi.validate(comment, schema);
}

exports.commentSchema= commentSchema;
exports.Comment= Comment;
exports.validate = validateComment;
