import React, {Component} from "react";
import {Link} from "react-router-dom";

import { toast } from "react-toastify";

class Post extends Component{
    state = {}

    componentDidMount() {
        const {post}=  this.props;
        this.setState({post})
    }
     render() {

        const {post}=  this.props;
        const {user }= this.props.user

        return (

            <div className="card mx-auto" style={{'width': '18rem', 'marginBottom': '20px'}}>
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Posted by {post.author} on {new Date(post.createdAt).toLocaleDateString()}
                    </h6>
                    <p className="card-text">{post.content.split(' ').slice(0, 5).join(' ') + ' ...'}</p>
                    <Link to={`/posts/${post.slug}`} className="card-link">{post.title}</Link>
                    {user && post.userId === user._id && (
                        <Link to={`/posts/edit/${post.slug}`}
                              className="card-link btn btn-outline-success">Edit</Link>)}
                    {user  && user.isAdmin && (
                        <button onClick={()=>this.props.onDelete(post)}  className="card-link btn btn-outline-danger">Delete</button>)}
                </div>
            </div>
        );
    }
}


export default Post;
