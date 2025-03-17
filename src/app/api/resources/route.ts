// GET, POST
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

// to disable default cached GET routes of next.js to prevent getting same results even after adding new data through api
// second option: you can use  revalidate option for time based validation to determine when you want to revaildate an api route
export const dynamic = 'force-dynamic'

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

export async function POST(req: Request) {
    try {
      const formData = await req.formData();
      const name = formData.get("name") as string;
      const category = formData.get("category") as string;
      const address = formData.get("address") as string;
      const phone = formData.get("phone") as string;
      const website = formData.get("website") as string;
      const email = formData.get("email") as string;
      const openingTime = formData.get("openingTime") as string;
      const closingTime = formData.get("closingTime") as string;
      const description = formData.get("description") as string;
      const image = formData.get("image") as File | null;
  
      let imagePath = null;
      if (image) {
        const buffer = Buffer.from(await image.arrayBuffer());
        const filePath = `/uploads/${image.name}`;
        await writeFile(path.join(process.cwd(), "public", filePath), buffer);
        imagePath = filePath;
      }
  
      const newResource = await prisma.resource.create({
        data: {
          name,
          category,
          address,
          phone,
          website,
          email,
          openingTime,
          closingTime,
          description,
          image: imagePath,
        },
      });
  
      return NextResponse.json({ success: true, resource: newResource }, { status: 201 });
    } catch (error) {
      console.error("Error adding resource:", error);
      return NextResponse.json({ success: false, message: "Error saving resource." }, { status: 500 });
    }
}
  
// DELETE AND PUT
// will need to create dynamic route handler 
