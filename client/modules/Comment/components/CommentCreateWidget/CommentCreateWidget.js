import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentCreateWidget.css';

export class CommentCreateWidget extends Component {
  addComment = () => {
    const usernameRef = this.refs.username;
    const textRef = this.refs.text;
    if (usernameRef.value && textRef.value) {
      this.props.addComment(usernameRef.value, textRef.value);
      usernameRef.value = textRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddComment ? styles.appear : '')}`;
    return (
            <div className={cls}>
                <div className={styles['form-content']}>
                    <h2 className={styles['form-title']}><FormattedMessage id="createNewComment" /></h2>
                    <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="username" />
                    <textarea placeholder={this.props.intl.messages.postContent} className={styles['form-field']} ref="text" />
                    <a className={styles['post-submit-button']} href="#" onClick={this.addComment}><FormattedMessage id="submit" /></a>
                </div>
            </div>
        );
  }
}

CommentCreateWidget.propTypes = {
  addComment: PropTypes.func.isRequired,
  showAddComment: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CommentCreateWidget);
