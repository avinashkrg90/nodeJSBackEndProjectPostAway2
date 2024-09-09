
import express from 'express'

const router = express.Router();

router.post('/signup', (req, res)=>{
    res.send("user signup page");
})

router.post('/signin', (req, res)=>{
    res.send("user signin page");
})

router.post('/logout', (req, res)=>{
    res.send("user logout page");
})

router.post('/logout-all-devices', (req, res)=>{
    res.send("user logout from all devices page");
})

router.get('/get-details/:userId', (req, res)=>{
    res.send("user detail page by ID");
})

router.get('/get-all-details', (req, res)=>{
    res.send("all user get all details page");
})

router.put('/update-details/:userId', (req, res)=>{
    res.send("user update details page");
})

export default router;