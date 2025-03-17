import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import AddResourceForm from "./AddResourceForm";

export default async function AddResourcePage() {
  // check session
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const currentUserId = session?.userId;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(currentUserId),
    },
  });

  return (
    <section>
      <AddResourceForm user={user} />
    </section>
  );
}
