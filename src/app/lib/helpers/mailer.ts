import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface sendEmailParams {
    email: string,
    emailType: string,
    userId: string | number;
}
// use case: send email for verify token, forgot pw
export const sendEmail = async ({ email, emailType, userId }: sendEmailParams) => {
    try {
        // create a hashed token using userId
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        // update db with token field we created for forgotPasswordToken etc. check schema 
        //token update for verifyToken
        if (emailType === "VERIFY") {
            await prisma.user.update({
                where: { id: Number(userId) },
                data: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: new Date(Date.now() + 3600000)
                }
            });
        } else if (emailType === "RESET") {
            await prisma.user.update({
                where: { id: Number(userId) },
                data: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
                }
            });
        }
        
        // Check if credentials are set
        if (!process.env.NODEMAILER_USER || !process.env.NODEMAILER_PASSWORD) {
            throw new Error('Mailtrap credentials are not configured. Please check your .env file.');
        }


        // Configure Mailtrap transport
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD
            },
            debug: true, // Enable debug logging
            logger: true // Enable logger
        });

        // Verify transport configuration
        try {
            await transport.verify();
            console.log('SMTP connection verified successfully');
        } catch (verifyError) {
            console.error('SMTP verification failed:', verifyError);
            throw new Error(`SMTP verification failed: ${verifyError instanceof Error ? verifyError.message : 'Unknown error'}`);
        }

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const resetPath = emailType === "VERIFY" ? "verifyemail" : "passwordreset";
        const resetUrl = `${baseUrl}/${resetPath}?token=${hashedToken}`;

        const mailOptions = {
            from: '"Himalayan Connect NYC" <noreply@himalayanconnectnyc.com>',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
                <p>Click <a href="${resetUrl}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>
                <p>Or copy and paste the link below in your browser:</p>
                <p>${resetUrl}</p>
            `
        };

        console.log('Attempting to send email to:', email);
        const mailResponse = await transport.sendMail(mailOptions);
        console.log('Email sent successfully:', mailResponse.messageId);
        return mailResponse;
  
    } catch (error: unknown) {
        console.error('Email sending error:', error);
        if (error instanceof Error) {
            if (error.message.includes('Too many failed login attempts')) {
                throw new Error('Too many failed login attempts. Please wait 15-30 minutes or create a new Mailtrap inbox.');
            }
            throw new Error(`Failed to send email: ${error.message}`);
        }
        throw new Error('Failed to send email: Unknown error');
    }
}