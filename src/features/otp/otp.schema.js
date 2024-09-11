
import mongoose from 'mongoose'
import { mailSender } from '../../utils/emailSender.js';

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },
});

// Define a function to send emails
async function sendOtpEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Veify OTP for password reset",
            `Please confirm your OTP
             Here is your OTP code: ${otp}`
        );
        console.log("Email sent successfully: ", mailResponse);
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
}

otpSchema.pre("save", async function (next) {
    console.log("New document saved to the database");
    // Only send an email when a new document is created
    if (this.isNew) {
        await sendOtpEmail(this.email, this.otp);
    }
    next();
});

const OtpModel = mongoose.model('Otp', otpSchema);
export default OtpModel;