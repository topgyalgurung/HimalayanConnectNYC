import { PrismaClient } from '@prisma/client'; 
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// export const runtime = "edge"; 

const prisma = new PrismaClient(); 

export async function POST(request:NextRequest) {
    try { 
        const reqBody = await request.json()
        const {email, password} = reqBody 

        const user = await prisma.user.findUnique({
          where: { 
              email:email
             }
        });
        console.log("User found:", !!user);
        if (!user) {
            return NextResponse.json({error:"User does not exist"}, {status:400}) 
         }
         // check if password is correct
         const validPassword = await bcryptjs.compare(password, user.password)
      if (!validPassword) {
            console.log("incorrect password")
            return NextResponse.json({error:'Invalid password'},{status:400})
      }
      console.log("verified")
         // Create token data
         const tokenData = {
            id: user.id,
            email: user.email
         };
      
         // Create token
      const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1d' });
      console.log("token created")

         // Set the new token with proper options
         const response = NextResponse.json({
             message: "Login successful",
             success: true
         })
      response.cookies.set("token", token, { httpOnly: true,
        sameSite:"strict", // prevents csrf attacks
        path:'/' // ensure cookie available across app
      })
      console.log('cookie set')
      return response;

    } catch (error: unknown) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
