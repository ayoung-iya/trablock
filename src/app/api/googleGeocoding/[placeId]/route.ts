import { GOOGLE_MAPS } from '@/libs/constants/googleMaps';

interface GoogleGeocodingResponse {
  results: {
    geometry: {
      location: { lat: number; lng: number };
    };
  }[];
}

// eslint-disable-next-line import/prefer-default-export
export async function GET(request: Request, { params: { placeId } }: { params: { placeId: string } }) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GOOGLE_MAPS.API_KEY}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  const rawData: GoogleGeocodingResponse = await response.json();

  const data = rawData.results?.[0].geometry.location;

  return Response.json(data ?? null);
}
