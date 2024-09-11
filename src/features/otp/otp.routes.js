import express from 'express'
import OtpController from './otp.controller.js';
import { auth } from '../../middlewares/jwtAuth.js';

const router = express.Router();

const otpController = new OtpController();

router.post('/send', (req, res, next)=>{
    otpController.sendOtp(req, res, next);
})

router.post('/verify', (req, res, next)=>{
    otpController.verifyOtp(req, res, next);
})

router.post('/reset-password', (req, res, next) =>{
    otpController.resetPassword(req, res, next);
})

export default router