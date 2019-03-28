import Comment from '../models/comment';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all comments
 * @param req
 * @param res
 * @returns void
 */
export function getComments(req, res) {
  Comment.find({ post_cuid: req.params.cuid }).sort('-dateAdded').exec((err, comments) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comments });
  });
}

/**
 * Save a comment
 * @param req
 * @param res
 * @returns void
 */
export function addComment(req, res) {
  if (!req.body.comment.username || !req.body.comment.text || !req.body.comment.post_cuid) {
    res.status(403).end();
  }

  const newComment = new Comment(req.body.comment);

    // Let's sanitize inputs
  newComment.username = sanitizeHtml(newComment.username);
  newComment.text = sanitizeHtml(newComment.text);
  newComment.cuid = cuid();
  newComment.post_cuid = sanitizeHtml(newComment.post_cuid);
  newComment.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comment: saved });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deleteComment(req, res) {
  Comment.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    }

    comment.remove(() => {
      res.status(200).end();
    });
  });
}

// /**
//  * Delete a post
//  * @param req
//  * @param res
//  * @returns void
//  */
// export function updateComment(req, res) {
//     Comment.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
//         if (err) {
//             res.status(500).send(err);
//         }
//
//         comment.remove(() => {
//             res.status(200).end();
//         });
//     });
// }
