import nodemailer from "nodemailer";

import config from "../config/config";

const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: parseInt(config.SMTP_PORT || "587"),
    secure: false,
    auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
    },
});

interface MailOptions {
    to: string;
    subject: string;
    html: string;
}

export const sendEmail = async ({ to, subject, html }: MailOptions): Promise<boolean> => {
    try {
        const info = await transporter.sendMail({
            from: `"TinyExp | Habit Tracker System" <${process.env.SMTP_USER}>`,
            to: to,
            subject: subject,
            html: html,
        });

        console.log("Mail sent ID: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("Mail gönderme hatası:", error);
        return false;
    }
};

export const sendResetPasswordMail = async (email: string, resetCode: string) => {
    const resetLink = `${config.URL}/forgotpassword/${resetCode}`;
    const emailTemplate = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Password Reset Request</h2>
            <p>Hello,</p>
            <p>You have requested a password reset for your account. Please click the button below to set a new password:</p>
            <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p>If you did not request this, you can safely ignore this email.</p>
        </div>
        `;
    const isSent = await sendEmail({
        to: email,
        subject: "Password Reset Link 🔒",
        html: emailTemplate,
    });

    if (!isSent) {
        throw new Error("Email could not be sent. Please try again later.");
    }
}