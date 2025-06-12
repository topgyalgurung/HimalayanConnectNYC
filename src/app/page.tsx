/**
 * Home Page Component
 *
 * The main landing page that displays resources with server-side data fetching.
 * Uses Suspense for loading states and client-side interactivity.
 *
 * @component
 * @returns {JSX.Element} The home page with resources display
 */

import { Suspense } from "react"; // Suspense is a React component that allows you to render a fallback UI while a component is loading.
import { getResources } from "./actions/resources/getResources";
import HomeClient from "./(homepage)/HomeClient"; // renders the homepage
import Loading from "./(homepage)/loading";

// Enable dynamic rendering for this route
export const dynamic = "force-dynamic";

// Add revalidation tags for manual revalidation
export const revalidate = 300; // 5 minutes

export default async function Home() {
  // Fetch initial resources on the server with caching
  const initialResources = await getResources();

  return (
    <Suspense fallback={<Loading />}>
      <HomeClient initialResources={initialResources} />
    </Suspense>
  );
}
