
import express from 'express'
import PostController from './post.controller.js';
import { auth } from '../../middlewares/jwtAuth.js';

const postController = new PostController();

const router = express.Router();

router.get('/all', auth, (req, res, next)=>{
    postController.getAllPosts(req, res, next);
})

router.get('/:postId', (req, res, next)=>{
    postController.getPostById(req, res, next);
})

router.get('/user/:userId', (req, res, next)=>{
    postController.getAllPostByUserId(req, res, next);
})

router.post('/', auth, (req, res, next)=>{
    postController.createPost(req, res, next);
})

router.delete('/:postId', auth, (req, res, next)=>{
    postController.deletePost(req, res, next);
})

router.put('/:postId', auth, (req, res, next)=>{
    postController.updatePost(req, res, next);
})


export default router