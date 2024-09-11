
import otpGenerator from 'otp-generator'
import OtpModel from './otp.schema.js';
import UserModel from '../user/user.schema.js';
import bcrypt from 'bcrypt';

export default class OtpController {

    sendOtp = async (req, res, next) => {
        try {
            const {email} = req.body;
            let otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            let result = await OtpModel.findOne({ otp: otp });
            while (result) {
                otp = otpGenerator.generate(6, {
                    upperCaseAlphabets: false,
                });
                result = await OtpModel.findOne({ otp: otp });
            }

            const otpPayload = { email, otp };
            const otpBody = await OtpModel.create(otpPayload);
            res.status(200).json({
                success: true,
                message: 'OTP sent successfully',
                otpBody,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    verifyOtp = async (req, res, next) => {
        try {
            const { email, otp } = req.body;
            // Check if all details are provided
            if (!otp) {
                return res.status(403).json({
                    success: false,
                    message: 'Please provide OTP',
                });
            }
            // Find the most recent OTP for the email
            const response = await OtpModel.find({ email }).sort({ createdAt: -1 }).limit(1);
            if (response.length === 0 || otp !== response[0].otp) {
                return res.status(400).json({
                    success: false,
                    message: 'The OTP is not valid',
                });
            }
            console.log("OTP verified");
            return res.status(201).json({
                success: true,
                message: 'OTP verified successfully'
            });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    resetPassword = async (req, res, next) => {
        const { email, newPassword } = req.body;
        const user = await UserModel.findOne({email});
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        console.log(user);
        const resp = await user.save();
        if (resp) {
            res.status(201).json({
                success: true,
                msg: "password updated successfully",
                res: resp,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }
}
