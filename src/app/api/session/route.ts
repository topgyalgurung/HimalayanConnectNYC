// /app/api/session/route.ts
import { getSession } from "@/app/lib/session";

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  return Response.json({ session });
}