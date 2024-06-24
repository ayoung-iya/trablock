'use client';

import { useJsApiLoader } from '@react-google-maps/api';

import { LIBRARIES } from '@/constants/googleMaps';

export type GoogleMapsApiReturn = {
  isLoaded: boolean;
  loadError?: Error;
};

export default function useGoogleMapsApi(): GoogleMapsApiReturn {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    // googleMapsApiKey: GOOGLE_MAPS.API_KEY,
    googleMapsApiKey: 'AIzaSyA60LilY-IBX50TbPKx99qtZkbxI8G1_3Q',
    libraries: LIBRARIES
  });

  return { isLoaded, loadError };
}
