import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

// Get all Comments
router.route('/:cuid').get(CommentController.getComments);

// Edit one post by cuid
router.route('/').put(CommentController.updateComment);

// Add a new Comment
router.route('/').post(CommentController.addComment);

// Delete a comment by cuid
router.route('/:cuid').delete(CommentController.deleteComment);

export default router;
