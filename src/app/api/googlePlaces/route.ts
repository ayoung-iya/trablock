import { NextRequest } from 'next/server';

import API_URL from '@/apis/constants/url';
import { GOOGLE_MAPS } from '@/libs/constants/googleMaps';

interface GooglePlaceResponse {
  suggestions: {
    placePrediction: {
      placeId: string;
      text: { text: string };
      structuredFormat: { mainText: { text: string } };
    };
  }[];
}

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: NextRequest) {
  const body = await request.json();

  const response = await fetch(`${API_URL.GOOGLE_PLACES_API}/v1/places:autocomplete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_MAPS.API_KEY,
      'Accept-Language': 'ko'
    },
    body: JSON.stringify(body)
  });
  const rawData: GooglePlaceResponse = await response.json();

  const data = rawData.suggestions.map(({ placePrediction: { placeId, text, structuredFormat } }) => {
    return { placeId, address: text.text, city: structuredFormat.mainText.text };
  });

  return Response.json(data);
}
