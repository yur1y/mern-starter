import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import CommentList from '../components/CommentList';
import CommentCreateWidget from '../components/CommentCreateWidget/CommentCreateWidget';

// Import Actions
import { addCommentRequest, fetchComments, deleteCommentRequest } from '../CommentActions';
import { toggleAddComment } from '../../App/AppActions';

// Import Selectors
import { getShowAddComment } from '../../App/AppReducer';
import { getComments } from '../CommentReducer';
import styles from '../../App/components/Header/Header.css';
import { FormattedMessage } from 'react-intl';

class CommentListPage extends Component {
  componentDidMount() {
    if (this.context && this.context.router) {
      const post_cuid = this.context.router.params.cuid;
      this.props.dispatch(fetchComments(post_cuid));
    }
  }

  handleDeleteComment = comment => {
        if (confirm('Do you want to delete this post')) { // eslint-disable-line
          this.props.dispatch(deleteCommentRequest(comment));
        }
  };

  handleAddComment = () => {
    this.props.dispatch(toggleAddComment());
  };
  handleRequestAddComment = (username, text) => {
    if (this.context && this.context.router) {
      const post_cuid = this.context.router.params.cuid;
      this.props.dispatch(addCommentRequest({ username, text, post_cuid }));
    }
    this.props.dispatch(toggleAddComment());
  };

  render() {
    return (
            <div> Comments:
                <CommentList handleDeleteComment={this.handleDeleteComment} comments={this.props.comments} />
                 <a className={styles['add-post-button']} href="#" onClick={this.handleAddComment}><FormattedMessage id="addPost" /></a>
                <CommentCreateWidget addComment={this.handleRequestAddComment} showAddComment={this.props.showAddComment} />
            </div>
        );
  }
}

// Actions required to provide data for this component to render in server side.
CommentListPage.need = [params => {
  return fetchComments(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddComment: getShowAddComment(state),
    comments: getComments(state),
  };
}

CommentListPage.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  showAddComment: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

CommentListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(CommentListPage);
