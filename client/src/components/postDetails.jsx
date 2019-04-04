import React, {Component} from "react";

import {getPost} from "../services/postService";
import {getProfile} from "../services/userService";
import Comments from "./comments";

class PostDetails extends Component {
    state = {
        data: {}
    }

    async getPost() {

        try {
            const slug = this.props.match.params.slug;

            const {data: post} = await getPost(slug);
            Object.assign(post, {author: await this.getAuthorName(post.userId)})
            this.setState({data: post});
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }

    }

    async getAuthorName(userId) {
        const {data: author} = await getProfile(userId)
        return author.name
    }

    async componentDidMount() {
        await this.getPost()
    }

    render() {
        const {data} = this.state;
        const {user} = this.props
        return (<div>
                <div className="jumbotron" style={{'marginTop': '20px'}}>
                    <h1 className="display-4">{data.title}</h1>
                    <p className="lead">Posted by {data.author} on {new Date(data.createdAt).toLocaleDateString()} </p>
                    <hr className="my-4"/>
                    <p>{data.content}</p>
                </div>

                {data._id && <Comments post={data} user={user}/>}
            </div>
        );
    }
}


export default PostDetails;
