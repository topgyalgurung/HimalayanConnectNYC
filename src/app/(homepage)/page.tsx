import { Suspense } from 'react';
import { getResources } from '../actions/resources/getResources';
import HomeClient from './HomeClient';
import Loading from './loading';

export default async function Home() {
  // Fetch resources on the server with initial empty filters
  const resources = await getResources();

  return (
    <Suspense fallback={<Loading />}>
      <HomeClient initialResources={resources} />
    </Suspense>
  );
}
