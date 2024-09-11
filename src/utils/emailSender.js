
import nodemailer from 'nodemailer'

export async function mailSender(email, title, body) {
    try {
        // create an email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        // configure email content
        const mailOptions = {
            from: 'robozealous@gmail.com',
            to: email,
            subject: title,
            text: body,
        }
        const result = await transporter.sendMail(mailOptions);
        console.log('Email Info:' + result);
        return result;

    } catch (error) {
        console.log(error.message);
    }
}