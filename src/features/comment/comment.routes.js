
import express from 'express'
import CommentController from './comment.controller.js';
import { auth } from '../../middlewares/jwtAuth.js';

const commentController = new CommentController();

const router = express.Router();

router.get('/:postId', (req, res, next)=>{
    commentController.getComments(req, res, next);
})

router.post('/:postId', auth, (req, res, next)=>{
    commentController.addComment(req, res, next);
})

router.delete('/:commentId', auth, (req, res, next)=>{
    commentController.deleteComment(req, res, next);
})

router.put('/:commentId', auth, (req, res, next)=>{
    commentController.updateComment(req, res, next);
})

export default router;