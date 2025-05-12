import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

import AddResourceForm from "./AddResourceForm";

export default async function AddResourcePage() {
  // check session
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <section>
      <AddResourceForm />
    </section>
  );
}
