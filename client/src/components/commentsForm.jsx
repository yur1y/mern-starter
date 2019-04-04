import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {getCurrentUser} from "../services/authService";

class CommentsForm extends Form {
    state = {
        data: {
            text: "",
            userId: "",
            postId: ""
        },
        errors: {}
    };

    schema = {
        _id: Joi.string(),
        userId: Joi.string(),
        createdAt: Joi.string(),
        postId: Joi.string(),
        text: Joi.string()
            .required()
            .label("Comment text").min(1).max(8192),
        author: Joi.string()
    };

    async getPost() {
        const {post} = this.props;
        const {data} = this.state;
        data.postId = post._id;
        this.setState({data})
    }

    async getUser() {
        const {data} = this.state;
        data.userId = await getCurrentUser()._id;
        this.setState({data})
    }

    async doSubmit() {

        // const {data} =  await saveComment(this.state.data);

        this.props.onComment(this.state.data)

    }

    async componentDidMount() {
        const {editedComment} = this.props;
        // console.log(editedComment);
        if (editedComment) {
            await this.setState({data: editedComment})
        }
        this.getPost();
        await this.getUser()
    }


    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("text", "Comment text", 'area')}
                    {this.renderButton("Submit")}
                </form>
            </div>
        );
    }
}

export default CommentsForm;
