import { getResources } from "@/app/lib/resources/getResources";
import HomeClient from "@/app/(homepage)/HomeClient";
import type { Resource } from "@/app/lib/types";
export default async function HomeServer({
  query,
  page,
  categories,
  boroughs,
  sort,
}: {
  query?: string;
  page: number;
  categories: string[];
  boroughs: string[];
  sort?: string;
}) {
  const { data, perPage, total } = await getResources({
    query,
    page,
    categories,
    boroughs,
    sort:
      sort === "newest" || sort === "oldest" || sort === "alphabetical"
        ? sort
        : "alphabetical",
  });
  return (
    <HomeClient
      initialResources={data as unknown as Resource[]}
      totalPages={Math.ceil(total / perPage)}
      selectedCategories={categories}
      selectedBoroughs={boroughs}
      selectedSort={
        sort === "newest" || sort === "oldest" || sort === "alphabetical"
          ? sort
          : "alphabetical"
      }
    />
  );
}
