// approve suggested edits
export async function addSuggestion(formData: FormData) {
    // extract all form fields into plain javascript object
    const data = Object.entries(formData.entries)
    try {
        const newEditResource = await 
        const name = data.name as string;
        const address = data.address as string;
        const phone: data.phone as string | null,
       co url: data.url as string | null,


        
        
    } catch (error) {
        
    }
    const body = await req.json();
    const resourceId = parseInt(params.id);

    // update your db
    try {
        await prisma.resourceEditSuggestion.create({
            where: { id:resourceId },
            data:body
        }) 
        return NextResponse.json({ success:true},)
        
    } catch (error) {
        console.error("Error updating edit resource: ", error)
        return NextResponse.json({error: "Server error"},{status:500})
        
    }

}