import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {getPost, savePost} from "../services/postService";
import {getCurrentUser} from "../services/authService";

class PostsForm extends Form {
    state = {
        data: {
            title: "",
            content: "",
            userId:""
        },
        errors: {}
    };

    schema = {
        _id: Joi.string(),
        userId: Joi.string(),
        slug: Joi.string(),
        createdAt:Joi.string(),
        title: Joi.string()
            .required()
            .label("Title").min(5).max(50),
        content: Joi.string()
            .required()
            .label("Content").min(1).max(8192)
    };

    async getPost() {
        const user = await getCurrentUser()

        try {
            if (this.props.match.params && this.props.match.params.slug) {
                const slug = this.props.match.params.slug;

                const {data: post} = await getPost(slug);
                this.setState({data: post});
            }
            else {

                const state = {...this.state.data};
                state.userId =user._id
                this.setState({data:state})
         console.log(this.state.data)
            }

        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }
     doSubmit = async () => {

        await savePost(this.state.data);

        this.props.history.push("/posts");
    }
    async componentDidMount() {

        await this.getPost();

    }


    render() {

        return (
            <div>
                <h1>Posts Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderInput("content", "Content", "area")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default PostsForm;
