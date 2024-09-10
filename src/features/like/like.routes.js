

import express from 'express'
import LikeController from './like.controller.js';
import { auth } from '../../middlewares/jwtAuth.js';

const likeController = new LikeController();

const router = express.Router();

router.get('/:id', (req, res, next)=>{
    likeController.getLikes(req, res, next);
})

router.post('/toggle/:id', auth, (req, res, next)=>{
    likeController.toggleLike(req, res, next);
})

export default router