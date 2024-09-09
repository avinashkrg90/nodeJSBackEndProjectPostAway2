
import express from 'express'

const router = express.Router();

router.get('/all', (req, res)=>{
    res.send("retrive all posts for a spectfic user")
})

router.get('/:postId', (req, res)=>{
    res.send("retrive a post by its Id");
})

router.get('/user/:userId', (req, res)=>{
    res.send("retrive all posts for a spectfic user")
})

router.post('/', (req, res)=>{
    res.send("post creation page")
})

router.delete('/:postId', (req, res)=>{
    res.send("deleting a specfic post by its Id")
})

router.put('/:postId', (req, res)=>{
    res.send("updating a specific post")
})


export default router