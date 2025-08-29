import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from '@/app/lib/prisma';
import { checkRateLimit } from "@/app/lib/rate-limit";
//import { checkRateLimit } from '@vercel/firewall';

// verify token and save new password after encrypting it 
export async function POST(request: NextRequest) {
    try {
        // Get client IP from request headers
        const forwardedFor = request.headers.get('x-forwarded-for')
        const ip = forwardedFor?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown'
        
        // Check rate limit
        const rateLimited = await checkRateLimit(ip)
        // if (rateLimitResult) return rateLimitResult
        if(rateLimited){
            return new NextResponse(
                JSON.stringify({
                    error:'Rate limit exceeded',
                }),{
                    status:429,
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }
            )
        }
        // continue
        const reqBody = await request.json();
        const { token, password } = reqBody;
        console.log("Token received: ", token);
        
        if (!token || !password) {
            return NextResponse.json({ error: "Token and password are required." }, { status: 400 });
        }

        // validate token and find the user
        const user = await prisma.user.findFirst({
            where: {
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: {
                    gt: new Date()
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token." }, { status: 400 });
        }

        //encrypt or hash the password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // clear reset token and expiry and update password
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                forgotPasswordToken: null,
                forgotPasswordTokenExpiry: null
            }
        });

        return NextResponse.json({
            message: "Password reset successful",
            success: true
        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Password reset error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            console.error("An unknown error occurred during password reset.");
            return NextResponse.json({ error: 'An unknown error occurred.' }, { status: 500 });
        }
    }
}
