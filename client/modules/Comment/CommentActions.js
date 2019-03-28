import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// Export Actions
export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

export function addCommentRequest(comment) {
  return (dispatch) => {

      console.log(comment, '___111')

    return callApi('comments', 'post', {
      comment: {
        username: comment.username,
        text: comment.text,
        post_cuid: comment.post_cuid,
      },
    }).then(res => dispatch(addComment(res.comment)));
  };
}

export function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    comments,
  };
}

export function fetchComments(cuid) {
  return (dispatch) => {
    return callApi(`comments/${cuid}`).then(res => {
      dispatch(addComments(res.comments));
    });
  };
}

export function fetchComment(cuid) {
  return (dispatch) => {
    return callApi(`comments/${cuid}`).then(res => dispatch(addComment(res.comment)));
  };
}

export function deleteComment(cuid) {
  return {
    type: DELETE_COMMENT,
    cuid,
  };
}

export function deleteCommentRequest(cuid) {
  return (dispatch) => {
    return callApi(`comments/${cuid}`, 'delete').then(() => dispatch(deleteComment(cuid)));
  };
}
