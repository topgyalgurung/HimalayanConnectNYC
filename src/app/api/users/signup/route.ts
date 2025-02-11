
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs"

await connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        console.log(reqBody)
        // create validation 
        const user = await User.findOne({email});
        if (user) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 });
        }
        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({
            username, 
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        console.log(savedUser) // just to see the savedUser data 

        return NextResponse.json({
            message: 'User created successfully', 
            success:true, 
            savedUser
        }, {status: 201})
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}