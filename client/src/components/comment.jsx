import React, {Component} from "react";

class Comment extends Component {

    render() {
        const {comment, editedComment, user} = this.props;


        return (<li className="list-group-item d-flex justify-content-between align-items-center">
                <span
                    className="badge badge-primary badge-pill text-left">By {comment.author} on {new Date(comment.createdAt).toLocaleDateString()}</span>
            {comment.text}
            <button className='btn btn-outline-success' onClick={() => this.props.onEdit(comment)}>
                {editedComment && editedComment._id === comment._id ? (<span>Cancel</span>) : ''} Edit
            </button>

            {!editedComment && user && user.isAdmin && (
                <button className='btn btn-outline-danger' onClick={() => this.props.onDelete(comment)}>
                    Delete</button>)}
        </li>)

    }
}

export default Comment