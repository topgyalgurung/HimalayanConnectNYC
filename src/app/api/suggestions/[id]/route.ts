// approve suggested edits
import prisma from "@/app/lib/prisma";
import{NextRequest, NextResponse} from 'next/server'

export async function POST(req: NextRequest, { params }:{params:{id:string}}) {
    const body = await req.json();
    const resourceId = parseInt(params.id);

    // update your db
    try {
        await prisma.resourceEditSuggestion.update({
            where: { id:resourceId },
            data:body
        }) 
        return NextResponse.json({ success:true},)
        
    } catch (error) {
        console.error("Error updating edit resource: ", error)
        return NextResponse.json({error: "Server error"},{status:500})
        
    }

}