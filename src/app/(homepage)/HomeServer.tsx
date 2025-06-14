/**
 * Home Server Component
 * 
 * Server component that fetches initial resources and passes them to HomeClient.
 * This component suspends during data fetching, enabling streaming.
 */

import { getResources } from "@/app/actions/resources/getResources";
import HomeClient from "./HomeClient";

export default async function HomeServer() {
  // This will suspend and stream when ready
  const initialResources = await getResources();
  
  return <HomeClient initialResources={initialResources} />;
} 