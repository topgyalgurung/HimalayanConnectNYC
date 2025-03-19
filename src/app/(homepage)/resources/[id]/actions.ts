import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function like(id: string) {
    // await prisma.incr(`likes:$id`);
    revalidatePath('/resource/${id}');
}

export async function unlike(id: string) {
    // await prisma.decr(`likes:$id`);
    revalidatePath('/resource/${id}');
}

// actions only work on forms and things inside forms 