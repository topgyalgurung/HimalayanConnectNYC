
import { NextRequest, NextResponse, after } from "next/server"
import { prisma } from '@/app/lib/prisma'
import { sendEmail } from "@/app/lib/helpers/mailer"
import { checkRateLimit, getClientIp } from "@/app/lib/rate-limit"

// backend generates a token, stores in db and sends email with token using nodemailer
export async function POST(request: NextRequest) {
    try {
        const ip = getClientIp(request.headers)

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

        // Send after the response goes out (rather than awaiting here) so a
        // real account and a nonexistent one take the same time to respond -
        // otherwise the email round-trip would leak account existence via timing.
        if (user) {
            after(() =>
                sendEmail({ email, emailType: "RESET", userId: user.id }).catch((err) => {
                    console.error("Failed to send reset email:", err);
                })
            );
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