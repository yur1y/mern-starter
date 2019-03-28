import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { addPostRequest, fetchPost } from '../../PostActions';

// Import Selectors
import { getPost } from '../../PostReducer';

import { toggleAddComment } from '../../../App/AppActions';
import CommentListPage from '../../../Comment/pages/CommentListPage';


class PostDetailPage extends Component {

  handleAddComment = (username, text) => {
    this.props.dispatch(toggleAddComment());
    this.props.dispatch(addPostRequest({ username, text }));
  };

  render() {
    return (
            <div>
                <Helmet title={this.props.post.title} />
                <div className={`${styles['single-post']} ${styles['post-detail']}`}>
                    <h3 className={styles['post-title']}>{this.props.post.title}</h3>
                    <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.post.name}</p>
                    <p className={styles['post-desc']}>{this.props.post.content}</p>
                </div>
                <CommentListPage />
               </div>
        );
  }
}

// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    // showAddComment: getShowAddComment(state),
    post: getPost(state, props.params.cuid),
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }),
  dispatch: PropTypes.func.isRequired,
};

PostDetailPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(PostDetailPage);
