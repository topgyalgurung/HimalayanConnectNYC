// api/resources/[id]/route.ts
// get resource details

// import resources from '@/app/api/db' // for testing 

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma';


// GET, PATCH, PUT DELETE

export async function PATCH(req:NextRequest, {params}:{params:{id:string}}) {
    const resourceId= parseInt(params.id) ;

    try {
        const body = await req.json();
        const { status } = body;

        if (!["PENDING", "APPROVED","REJECTED"].includes(status)) {
            return NextResponse.json({error: "invalid status"},{status:400})
        }

        const updatedResource = await prisma.resource.update({
            where: { id:resourceId },
            data: { status },
        });
        return NextResponse.json(updatedResource)
    } catch (error) {
        console.error("Error updating resource status: ", error)
        return NextResponse.json({error: "Server error"},{status:500})
    }
}

// // update a resource 
// export async function PUT(
//     request: Request,
//     context: {params:{id:string}}
// ) {
//     const id = +context.params.id;
//     const resource = await request.json()
//     const index = resources.findIndex((r) => r.id === id);
//     resources[index] = resource;
//     return Response.json(resources)
// }


// // remove a resource 
// export async function DELETE(
//     request: Request,
//     context: {params:{id:string}},
// ) {
//     const id = +context.params.id;

//     const index = resources.findIndex((r) => r.id === id);
//     resources.splice(index, 1);
//     return Response.json(resources);
// }