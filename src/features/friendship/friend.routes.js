

import express from 'express'

const router = express.Router();

router.get('/get-friends/:userId', (req, res)=>{
    res.send("get a user friend");
});

router.get('/get-pending-requests', (req, res)=>{
    res.send("get pending friend requests")
})

router.post('/toggle-friendship/:friendId', (req, res)=>{
    res.send("toggle friendship with another user")
})

router.post('/response-to-request/:friendId', (req, res)=>{
    res.send("accept or reject a friend request")
})

export default router

