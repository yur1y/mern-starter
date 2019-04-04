import React, {Component} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {deletePost, getPosts} from "../services/postService";
import Post from "./post";
import {getProfile} from "../services/userService";


class Posts extends Component {
    state = {
        posts: [],
        user: null
    };

    async getPosts() {
        const {data: posts} = await getPosts();
        await posts.forEach(async (p) => {
            const {data} = await getProfile(p.userId);

            Object.assign(p, {author: data.name})
            this.setState({posts: this.state.posts.concat([p])})
        });
    }

    handleDelete = async post => {

        const originalPosts = this.state.posts;
        const posts = originalPosts.filter(p => p._id !== post._id);
        this.setState({posts});

        try {
            await deletePost(post._id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast.error("This movie has already been deleted.");

            this.setState({posts: originalPosts});
        }
    }

    async componentDidMount() {
        await this.getPosts()
    }

    render() {
        const {posts} = this.state;
        const user = this.props;

        return (
            <div>
                {user && (
                    <Link
                        to="/posts/new"
                        className="btn btn-outline-primary"
                        style={{marginTop: 20}}
                    >
                        New Post
                    </Link>
                )}

                <div className="row " style={{'marginTop': '30px'}}>

                    {!posts && <p className="col-12 d-flex justify-content-around"> no posts yet</p>}

                    {posts && posts.map(post => (
                        <Post key={post._id} post={post} user={user} onDelete={this.handleDelete}/>))}
                </div>
            </div>

        );
    }
}

export default Posts;
