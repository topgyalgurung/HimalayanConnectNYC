

import { getResources } from "@/app/lib/resources/getResources";
import HomeClient from "./HomeClient";

export default async function HomeServer({search, page}: {search?: string, page: number}) {
  const {data, perPage, total} = await getResources(search ??"", page);
  return <HomeClient 
  initialResources={data}
  totalPages={Math.ceil(total/perPage)}
  page={page}/>;
} 