// add a new resource
// This allows you to handle file uploads and save image URLs to the database
// import { v2 as cloudinary } from "cloudinary";

import prisma from "@/app/lib/prisma"; // Adjust path
import { getSession } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response:NextResponse) {
    // authenticate the request 
  const session = await getSession();
    // check if session exists, otherwise deny access
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  // check if access to user email, make sure access on server 
  // client side hacker can use any email to update record of another user   
  const currentUserId = session?.userId!;

  try {
      // access req body to get data submitted on form 
    const data = await request.json();
    
    // check where createdbyid equals currentuseiD 
      // Save to database
    const resource = await prisma.resource.create({
      data: {
        ...data,
        createdById:Number(currentUserId),
        },
        
    });
    return NextResponse.json({ message: "Resource added successfully" ,resource , status: 201 })
  } catch (error:any) {
    return NextResponse.json({ error: "Failed to save resource" }, {status:500});
    }

}

export async function DELETE(request: NextRequest, response: NextResponse) {
   // authenticate the request 
   const session = await getSession();
   // check if session exists, otherwise deny access
   if (!session?.userId) {
     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }
 // check if access to user email, make sure access on server 
 // client side hacker can use any email to update record of another user   
 const currentUserId = session?.userId!;
  
}