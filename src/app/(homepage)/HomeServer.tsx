

import { getResources } from "@/app/lib/resources/getResources";
import HomeClient from "./HomeClient";

export default async function HomeServer() {
  const initialResources = await getResources();
  return <HomeClient initialResources={initialResources} />;
} 