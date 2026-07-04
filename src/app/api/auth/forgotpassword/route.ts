
import { NextRequest, NextResponse } from "next/server"
import { prisma } from '@/app/lib/prisma'
import { sendEmail } from "@/app/lib/helpers/mailer"
import { checkRateLimit } from "@/app/lib/rate-limit"

// backend generates a token, stores in db and sends email with token using nodemailer
export async function POST(request: NextRequest) {
    try {
        // Get client IP from request headers
        const forwardedFor = request.headers.get('x-forwarded-for')
        const ip = forwardedFor?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown'

        // Check rate limit
        const rateLimitResult = await checkRateLimit(ip)
        if (rateLimitResult) return rateLimitResult

        const reqBody = await request.json()
        const { email } = reqBody
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Look up only the id - never return the full user record, which
        // would include the password hash and reset/verify tokens.
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true },
        });

        // helper function sendEmail handles creating token and updating db
        if (user) {
            await sendEmail({
                email,
                emailType: "RESET",
                userId: user.id
            })
        }

        // Respond identically whether or not the account exists, so this
        // endpoint can't be used to enumerate registered emails.
        return NextResponse.json({
            message: "If an account with that email exists, you'll receive a password reset link shortly.",
            success: true,
        })

    } catch (error: unknown) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}