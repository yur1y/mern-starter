import React, {Component} from 'react';
import Comment from "./comment";
import {deleteComment, getComment} from "../services/commentService";
import {getProfile} from "../services/userService";
import CommentsForm from "./commentsForm";

class Comments extends Component {
    state = {
        comments: [],
        editedComment: null
    }

    async getComments() {
        const {post} = this.props
        this.setState({post})

        const {data: comments} = await getComment(post._id)
        await comments.forEach(async (c) => {
            const {data: author} = await getProfile(c.userId);

            Object.assign(c, {author: author.name})
            this.setState({comments: this.state.comments.concat([c])})
        });

    }


    handleComment = async (newComment) => {
        const comment = Object.assign(newComment, {author: await getProfile(newComment.userId).name})
        this.setState({comments: this.state.comments.concat([comment])})
    }

    toggleEdit = async comment => {
        let {_id} = comment;
        if (this.state.editedComment && this.state.editedComment._id === _id) {
            comment = null
        }
        await this.setState({editedComment: comment})
    }
    handleEdit = async comment => {
        const {comments} = this.state
        comments.map(c => c._id === comment._id ? c.text = comment.text : c)
        this.setState({comments, editedComment: null})

    }
    handleDelete = async comment => {
        const {comments} = this.state

        await this.setState({comments: comments.filter(c => c._id !== comment._id), editedComment: null})

        await deleteComment(comment._id)
    }

    async componentDidMount() {
        await this.getComments()
    }

    render() {
        const {comments, editedComment} = this.state;
        const {post, user} = this.props;
        console.log(user);
        return (<div>
            <ul className='list-group'>
                {comments && comments.map((c, i) => (
                    <span key={`${c._id}${i}`}>
                            <Comment key={c._id} editedComment={editedComment} comment={c} user={user}
                                     onComment={this.handleEdit}
                                     onEdit={this.toggleEdit} onDelete={this.handleDelete}/>
                        {editedComment && post && editedComment._id === c._id && (
                            <CommentsForm editedComment={editedComment} post={post} onComment={this.handleEdit}/>
                        )}
                  </span>
                ))}

            </ul>

            {post && !editedComment && <CommentsForm onComment={this.handleComment} post={post}/>}
        </div>)
    }
}

export default Comments