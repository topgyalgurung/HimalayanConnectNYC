import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request:NextRequest){
    const authHeader = request.headers.get('authorization');
    if(authHeader === `Bearer ${process.env.CRON_SECRET}`){
        return new NextResponse({
            error: "Unauthorized"},{
                  status:401

            }

        })
    }
    return NextResponse.json({ok: true});
}