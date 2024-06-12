const API_URL = {
  TEST: process.env.NEXT_PUBLIC_API_URL_TEST,
  GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  GOOGLE_MAPS_MAP_ID: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || ''
};

export default API_URL;
