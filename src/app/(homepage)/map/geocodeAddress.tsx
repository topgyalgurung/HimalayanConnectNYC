export const geocodeAddress = async (address: string) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    if (data.status === "OK") {
      const loc = data.results[0].geometry.location;
      return {
        lat: loc.lat,
        lng: loc.lng,
      };
    }
    throw new Error("Geocoding failed");
  };