import { getResources } from "@/app/lib/resources/getResources";
import HomeClient from "@/app/(homepage)/HomeClient";
import type { Resource } from "@/app/lib/types";
export default async function HomeServer({
  query,
  page,
}: {
  query?: string;
  page: number;
}) {
  const { data, perPage, total } = await getResources({ page });
  return (
    <HomeClient
      initialResources={data as unknown as Resource[]}
      totalPages={Math.ceil(total / perPage)}
      page={page}
    />
  );
}
