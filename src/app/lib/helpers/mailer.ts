import { Resend } from 'resend';
import bcryptjs from 'bcryptjs';
// import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured in environment variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

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
        
        const domain = process.env.DOMAIN ;
        const resetLink = `${domain}/${emailType === "VERIFY" ? "verifyemail" : "reset-password"}?token=${hashedToken}`;
        
        console.log('Attempting to send email with link:', resetLink);

        // =============== NODEMAILER IMPLEMENTATION (FOR REFERENCE) ===============
        /*
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
            }
        });

        // Verify transport configuration
        try {
            await transport.verify();
            console.log('SMTP connection verified successfully');
        } catch (verifyError) {
            console.error('SMTP verification failed:', verifyError);
            throw new Error(`SMTP verification failed: ${verifyError instanceof Error ? verifyError.message : 'Unknown error'}`);
        }

        const mailOptions = {
            from: '"Himalayan Connect NYC" <noreply@himalayanconnectnyc.com>',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
         
             html: `<p> Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verify-email":"reset-password"}?token=${hashedToken}">
            here </a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
             or copy and paste the link below in your browser: <br>
            ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verify-email" : "reset-password"}?token=${hashedToken} </p>`
            
        };

        const mailResponse = await transport.sendMail(mailOptions);
        console.log('Email sent successfully:', mailResponse.messageId);
        return mailResponse;
        */
        // =============== END NODEMAILER IMPLEMENTATION ===============

        // Resend Implementation
        const { data, error } = await resend.emails.send({
            from: 'Himalayan Connect NYC <onboarding@resend.dev>', // Use Resend's default sender during setup
            to: [email], // Resend expects an array of recipients
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
                    <h2 style="color: #333; text-align: center;">
                        ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}
                    </h2>
                    <p style="color: #666; font-size: 16px; line-height: 1.5;">
                        Please click the button below to ${emailType === "VERIFY" ? "verify your email address" : "reset your password"}.
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}"
                           style="background-color: #4A90E2; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                            ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
                        </a>
                    </div>
                    <p style="color: #666; font-size: 14px;">
                        If the button doesn't work, you can copy and paste this link into your browser:
                        <br>
                        <a href="${resetLink}" style="color: #4A90E2; word-break: break-all;">
                            ${resetLink}
                        </a>
                    </p>
                    <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
                        If you didn't request this email, you can safely ignore it.
                    </p>
                </div>
            `
        });

        if (error) {
            console.error('Email sending error:', error);
            throw new Error(error.message);
        }

        console.log('Email sent successfully:', data);
        return data;
    } catch (error: unknown) {
        console.error('Email sending error:', error);
        if (error instanceof Error) {
            throw new Error(`Failed to send email: ${error.message}`);
        }
        throw new Error('Failed to send email: Unknown error');
    }
}