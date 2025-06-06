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
import { getResources } from "./actions/resources/getResources"; //fetches resources from the database
import HomeClient from "./(homepage)/HomeClient"; // renders the homepage
import Loading from "./(homepage)/loading";

export const dynamic = "force-dynamic"; // setting for entire route, dynamically rendered
// for more granular
// better use cache: 'no-cache' with fetch or
// next{revalidate:3600} with fetch (after 1 hour fetch new data)
export default async function Home() {
  // fix: move it down, no need to fetch here
  // Fetch resources on the server
  const resources = await getResources();

  return (
    <Suspense fallback={<Loading />}>
      <HomeClient initialResources={resources} />
    </Suspense>
  );
}
