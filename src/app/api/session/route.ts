// /app/api/session/route.ts
import { getSession } from "@/app/lib/session";

export async function GET() {
  const session = await getSession();
  return Response.json({ session });
}