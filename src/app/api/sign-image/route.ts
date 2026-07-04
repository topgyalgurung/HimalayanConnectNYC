import { v2 as cloudinary } from 'cloudinary';
import { getSession } from '@/app/lib/auth-session';

export const dynamic = 'force-dynamic';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

// Params that could be used to overwrite/target existing assets or change
// how Cloudinary treats the upload - never sign these, regardless of what
// the caller asks for.
const DISALLOWED_PARAM_KEYS = [
    'public_id',
    'overwrite',
    'invalidate',
    'type',
    'access_mode',
    'moderation',
    'eager',
    'notification_url',
    'resource_type',
    'backup',
];

export async function POST(request: Request) {
    const session = await getSession();
    if (!session?.userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { paramsToSign } = body;

    if (!paramsToSign || typeof paramsToSign !== 'object' || Array.isArray(paramsToSign)) {
        return Response.json({ error: 'Invalid request' }, { status: 400 });
    }

    for (const key of DISALLOWED_PARAM_KEYS) {
        if (key in paramsToSign) {
            return Response.json({ error: `Param "${key}" is not allowed` }, { status: 400 });
        }
    }

    if (!process.env.CLOUDINARY_API_SECRET) {
        throw new Error('CLOUDINARY_API_SECRET is not defined');
    }

    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);

    return Response.json({ signature });
}