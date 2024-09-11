
import OtpRepository from "./otp.repository.js"

export default class OtpController{
    constructor() {
        this.otpRepository = new OtpRepository();
    }
    
    sendOtp = async (req, res, next) => {

    }

    verifyOtp = async (req, res, next) => {

    }

    resetPassword = async (req, res, next) => {

    }


}
