import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import CommentListItem from './CommentListItem/CommentListItem';

function CommentList(props) {
  return (
        <div className="listView">
            {props.comments.length !== 0 ?
                props.comments.map(comment => (
                    <CommentListItem
                      comment={comment}
                      key={comment.cuid}
                      onDelete={() => props.handleDeleteComment(comment.cuid)}
                      onUpdate={() => props.handleUpdateComment(comment)}
                    />
                ))
                : 'No Comments yet'
            }
        </div>
    );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
  handleUpdateComment: PropTypes.func.isRequired,
};

export default CommentList;
