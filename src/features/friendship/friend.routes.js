

import express from 'express'
import FriendController from './friend.controller.js';
const router = express.Router();
import { auth } from '../../middlewares/jwtAuth.js';

const friendController = new FriendController();

router.get('/get-friends/:userId', (req, res, next)=>{
    friendController.getFriends(req, res, next);
});

router.get('/get-pending-requests', auth, (req, res, next)=>{
    friendController.getPendingFriendRequest(req, res, next);
})

router.post('/toggle-friendship/:friendId', auth, (req, res, next)=>{
    friendController.toggleFriendship(req, res, next);
})

router.post('/response-to-request/:friendId', auth, (req, res, next)=>{
    friendController.responseTorequest(req , res, next);
})

router.post('/send-friend-request/:friendId', auth, (req, res, next)=>{
    friendController.sendFriendRequest(req , res, next);
})

export default router

