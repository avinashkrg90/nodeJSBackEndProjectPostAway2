

import express from 'express'

const router = express.Router();

router.get('/:id', (req, res)=>{
    res.send("get likes for a specific post or comment")
})

router.post('/toggle/:id', (req, res)=>{
    res.send("toggle like on a post or comment")
})

export default router