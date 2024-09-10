
import express from 'express'
import UserController from './user.controller.js';
import { auth } from '../../middlewares/jwtAuth.js';
import { uploadAvatar } from '../../utils/fileUpload.js';
import { rmSync } from 'fs';

const userController = new UserController

const router = express.Router();


router.post('/signup', (req, res, next)=>{
    userController.userRegistration(req, res, next);
})

router.post('/signin', (req, res, next)=>{
    userController.userLogin(req, res, next);
})

router.post('/logout', (req, res, next)=>{
    userController.userLogout(req, res, next);
})

router.post('/logout-all-devices', (req, res, next)=>{
    userController.userLogoutFromAllDevices(req, res, next);
})

router.get('/get-details/:userId', (req, res, next)=>{
    userController.getUserDetailById(req, res, next);
})

router.get('/get-all-details', auth, (req, res, next)=>{
    userController.getAllUserDetail(req, res, next);
})

router.put('/update-details/:userId', auth, (req, res, next)=>{
    userController.updateUserDetails(req, res, next);
})

router.post('/avatar-upload', auth, uploadAvatar.single('image'), (req, res, next)=>{
    userController.uploadAvatar(req, res, next);
})

router.get('/get-avatar/:id', auth, (req, res, next)=>{//userId
    userController.fetchAvatar(req, res, next);
})

export default router;