import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentListItem.css';

function CommentListItem(props) {
  const d = new Date(props.comment.dateAdded),
    dformat = [d.getMonth() + 1,
                d.getDate(),
                d.getFullYear()].join('/') + ' ' +
            [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':');

  return (
        <div className={styles['single-post']}>
            <p className={styles['author-name']}>On {dformat}<FormattedMessage id="by" /> {props.comment.username}</p>
            <p className={styles['post-desc']}>{props.comment.text}</p>
            <p className={styles['post-action']}><a href="#" onClick={props.onUpdate}><FormattedMessage id="updateComment" /></a></p>
             <p className={styles['post-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteComment" /></a></p>
        </div>
    );
}

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    username: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentListItem;
