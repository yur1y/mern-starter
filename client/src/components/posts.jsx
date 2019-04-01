import React, { Component } from "react";
import {getPosts} from "../services/postService";


class Movies extends Component {
    state = {
    posts:[]
    };

    async componentDidMount() {
        const { data:posts } = await getPosts();
        this.setState({posts})
        console.log(posts)
    }



    render() {

         const { user } = this.props;





        return (
            <div className="row">
                <div className="col-3">

                </div>
                <div className="col">

                    <p>Showing 12 movies in the database.</p>


                </div>
            </div>
        );
    }
}

export default Movies;
