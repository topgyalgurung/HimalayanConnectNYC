// GET, POST
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const resources = await prisma.resource.findMany({
            include: {
                ResourceCategory: {
                    select: {name:true},
                },
                Location: {
                    select: {
                        id: true,
                        resourceId:true,
                        latitude: true,
                        longitude:true
                    }
                },
            }
        });
        console.log("Fetched resources: ", JSON.stringify(resources, null, 2)); // Debug log
        return NextResponse.json(resources)
    } catch (error) {
        console.log("Error fetching resources: ", error);
        return NextResponse.json({error: "Failed to fetch resources"},{status: 500})
        
    }
}

// DELETE AND PUT
// will need to create dynamic route handler 
