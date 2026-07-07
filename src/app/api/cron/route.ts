import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
    const cronSecret = process.env.CRON_SECRET;
    const authHeader = request.headers.get('authorization') ?? '';

    if (!cronSecret) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const expected = Buffer.from(`Bearer ${cronSecret}`);
    const provided = Buffer.from(authHeader);

    const isValid =
        expected.length === provided.length &&
        crypto.timingSafeEqual(expected, provided);

    if (!isValid) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ ok: true });
}