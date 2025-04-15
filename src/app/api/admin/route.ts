import { auth } from "@/auth"
import { NextResponse } from "next/server"

// GET, PATCH, DELETE users
// manage users (admin)
 
export const GET = auth(function GET(req) {
  if (req.auth) return NextResponse.json(req.auth)
  return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
})