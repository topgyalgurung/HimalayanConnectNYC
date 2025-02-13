import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request:NextRequest) =>{
    try {
       
        const token = request.cookies.get('token')?.value || '';  // encoded token
        // extract response of function
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);         // any for now, not good idea, but change 
        return decodedToken.id;     // from api/users/login/route.ts 
    } catch (error:any) {
        throw new Error(error.message);
        
    }
}