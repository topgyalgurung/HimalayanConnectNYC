import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function ResourceEditPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const key = `resources: ${params.id}`;

  // Fetch resource data by ID from the database
  const resource = await prisma.resource.findUnique({
    where: {
      id: Number(key), // Convert the string ID to a number
    },
  });

  async function updateResource() {
    // mutate data 

    await prisma.resource.update({
      where: {
        id: id,
        
        
      }

    })
    
    // refetch and cache bust 
    revalidatePath('/resource/${params.id}/edit')
  }

  return (
    <div>
      <div>
        <h1>Edit Resource</h1>
        <form action={updateResource}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              defaultValue={resource?.name}
              // Other input fields and handling logic here
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              defaultValue={resource?.description}
              // Other input fields and handling logic here
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              defaultValue={resource?.address}
              // Other input fields and handling logic here
            />
            <button type="submit">Save and continue</button>
          </div>
        </form>
      </div>
    </div>
  );
}
