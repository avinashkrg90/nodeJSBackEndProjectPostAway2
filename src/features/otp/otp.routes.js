import express from 'express'

const router = express.Router();

router.post('/send', (req, res)=>{
    res.send("send an otp for password reset")
})

router.post('/verify', (req, res)=>{
    res.send("verify an otp")
})

router.post('/reset-password', (req, res)=>{
    res.send("reset the user password")
})

export default router