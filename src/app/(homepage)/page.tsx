/**
 * Home Page Component
 * 
 * The main landing page that displays resources with server-side data fetching.
 * Uses Suspense for loading states and client-side interactivity.
 * 
 * @component
 * @returns {JSX.Element} The home page with resources display
 */

import { Suspense } from 'react'; // Suspense is a React component that allows you to render a fallback UI while a component is loading.
import { getResources } from '../actions/resources/getResources'; //fetches resources from the database
import HomeClient from './HomeClient'; // renders the homepage
import Loading from './loading';

export default async function Home() {

  // Fetch resources on the server  
  const resources = await getResources();

  return (
    <Suspense fallback={<Loading />}>  
      <HomeClient initialResources={resources} />
    </Suspense>
  );
}
