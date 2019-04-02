import React, {Component} from "react";
import {Link} from "react-router-dom";
import {getPosts} from "../services/postService";
import Post from "./post";
import {getProfile} from "../services/userService";


class Posts extends Component {
    state = {
        posts: [],
        user:null
    };

    async componentDidMount() {
        const {data: posts} = await getPosts();
        await posts.forEach(async (p) => {
            const {data} = await getProfile(p.userId);

            Object.assign(p, {author: data.name})
            this.setState({posts: this.state.posts.concat([p])})

        });

    }

    render() {
        const { posts} = this.state;
        const user =this.props;

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

                     {posts && posts.map(post => (<Post  key={post._id} post={post} user={user}/>))}
                 </div>
             </div>

        );
    }
}

export default Posts;
