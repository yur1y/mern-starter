import { ADD_COMMENT, ADD_COMMENTS, DELETE_COMMENT, UPDATE_COMMENT } from './CommentActions';

// Initial State
const initialState = { data: [] };

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT :
      return {
        data: [action.comment, ...state.data],
      };

    case ADD_COMMENTS :
      return {
        data: action.comments,
      };

    case DELETE_COMMENT :
      return {
        data: state.data.filter(comment => comment.cuid !== action.cuid),
      };

    case UPDATE_COMMENT:
      return {
        data: state.data.map(comment => { if (comment.cuid === action.comment.cuid) {
          comment.text = action.comment.text;
          return comment;
        }
          return comment;
        }),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all comments
export const getComments = state => state.comments.data;


// Export Reducer
export default CommentReducer;
