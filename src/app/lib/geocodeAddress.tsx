/**
 * GeocodeAddress Component
 * A component that geocodes an address
 * Uses Google Maps API for geocoding
 */

type Coordinates = {
  lat: number;
  lng: number;
};

const geocodeWithGoogle = async (
  address: string,
  apiKey: string
): Promise<Coordinates> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Geocoding HTTP error: ${response.status}`);
  }

  const data = await response.json();

  if (data.status === "OK" && data.results?.[0]?.geometry?.location) {
    const loc = data.results[0].geometry.location;
    return {
      lat: loc.lat,
      lng: loc.lng,
    };
  }

  const errorMessage =
    data?.error_message || `Geocoding failed with status: ${data?.status}`;
  throw new Error(errorMessage);
};

const geocodeWithNominatim = async (address: string): Promise<Coordinates> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=us&q=${encodeURIComponent(
      address
    )}`,
    {
      cache: "no-store",
      headers: {
        "Accept-Language": "en",
        "User-Agent": "HimalayanConnectNYC/1.0",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Nominatim HTTP error: ${response.status}`);
  }

  const results = (await response.json()) as Array<{
    lat: string;
    lon: string;
  }>;

  if (!results.length) {
    throw new Error("Nominatim could not locate the address");
  }

  return {
    lat: Number(results[0].lat),
    lng: Number(results[0].lon),
  };
};

export const geocodeAddress = async (address: string) => {
  const apiKey =
    process.env.GOOGLE_MAPS_SERVER_API_KEY ||
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (apiKey) {
    try {
      return await geocodeWithGoogle(address, apiKey);
    } catch (googleError) {
      console.warn("Google geocoding failed, falling back to Nominatim:", googleError);
    }
  }

  return geocodeWithNominatim(address);
};