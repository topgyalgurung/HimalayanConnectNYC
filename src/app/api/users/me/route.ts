import {connect} from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { NextRequest , NextResponse } from 'next/server';
import User from '@/models/userModel'

connect();

export async function GET(request:NextRequest){
    try {
       const userId = await getDataFromToken(request);
       const user = await User.findOne({_id: userId}).select("-password"); // or findById, deselect password
       return NextResponse.json({
        message:"User found",
        data:user
       })
    } catch (error: unknown) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
        
    }
}