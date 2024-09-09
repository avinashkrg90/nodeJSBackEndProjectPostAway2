
import express from 'express'

const router = express.Router();

router.get('/:postId', (req, res)=>{
    res.send("get comments for a specific post")
})

router.post('/:postId', (req, res)=>{
    res.send("add a comment to a specfic post")
})

router.delete('/:commentId', (req, res)=>{
    res.send("delete a specific comment")
})

router.put('/:commentId', (req, res)=>{
    res.send("update a specific comment")
})

export default router;