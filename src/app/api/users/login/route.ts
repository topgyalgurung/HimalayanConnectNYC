import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect() // connect to database 

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody 

        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({error:"User does not exist"}, {status:400}) 
         }
         // check if password is correct
         const validPassword = await bcryptjs.compare(password, user.password)
         if (!validPassword) {
            return NextResponse.json({error:'Invalid password'},{status:400})
         }
         //create token data
         const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
         }
         // create token
         const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:"1d"})

         // set user cookie 
         const response = NextResponse.json({message:"Login successful", success:true})
         response.cookies.set("token", token, {httpOnly:true})
         return response;
        
         // next we should not be able to go to login after logged in and profile routes if not logged in 
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
    
}