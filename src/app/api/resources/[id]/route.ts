// api/resources/[id]/route.ts
import resources from '@/app/api/db' // for testing 

// GET, PATCH, PUT DELETE

// get resource details

// update a resource 
export async function PUT(
    request: Request,
    context: {params:{id:string}}
) {
    const id = +context.params.id;
    const resource = await request.json()
    const index = resources.findIndex((r) => r.id === id);
    resources[index] = resource;
    return Response.json(resources)
}

// remove a resource 
export async function DELETE(
    request: Request,
    context: {params:{id:string}},
) {
    const id = +context.params.id;

    const index = resources.findIndex((r) => r.id === id);
    resources.splice(index, 1);
    return Response.json(resources);
}